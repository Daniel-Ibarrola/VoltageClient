import {
    CognitoIdentityProviderClient,
    ConfirmForgotPasswordCommand,
    ForgotPasswordCommand,
    InitiateAuthCommand,
    NotAuthorizedException,
    RespondToAuthChallengeCommand,
    UserNotFoundException,
    ExpiredCodeException,
} from "@aws-sdk/client-cognito-identity-provider";

const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const AWS_REGION = import.meta.env.VITE_AWS_REGION;


/**
 * Make a request to AWS Cognito to authenticate a user
 * @param {string} user - The username of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A promise with cognito response object.
 * @throws {UserNotFoundException} If the user does not exist.
 * @throws {NotAuthorizedException} If the password is incorrect.
 */
const _cognitoLogin = async (user, password) => {
    // Make a request to AWS Cognito to authenticate a user
    const client = new CognitoIdentityProviderClient({region: AWS_REGION});
    const input = {
        AuthParameters: {
            USERNAME: user,
            PASSWORD: password,
        },
        AuthFlow: 'USER_PASSWORD_AUTH',
        ClientId: CLIENT_ID,
    };
    const command = new InitiateAuthCommand(input);
    return await client.send(command);
};


/**
 * Updates the password for a new user in AWS Cognito. This is done once per user.
 * @param {string} user - The username of the user.
 * @param {string} newPassword - The new password for the user.
 * @param {string} session - The session information.
 * @returns {Promise<Object>} A promise resolving to cognito response object.
 */
const _cognitoUpdatePassword = async (user, newPassword, session) => {
    const client = new CognitoIdentityProviderClient({region: AWS_REGION});
    const input = {
        ChallengeName: "NEW_PASSWORD_REQUIRED",
        ChallengeResponses: {
            USERNAME: user,
            NEW_PASSWORD: newPassword
        },
        ClientId: CLIENT_ID,
        Session: session
    };
    const command = new RespondToAuthChallengeCommand(input);
    return await client.send(command);
};


/**
 * Requests a password reset for a user in AWS Cognito.
 * @param {string} user - The username of the user.
 * @returns {Promise<Object>} A promise resolving to the response object from AWS cognito.
 */
const _cognitoRequestPasswordReset = async (user) => {
    const client = new CognitoIdentityProviderClient({region: AWS_REGION})
    const input = {
        ClientId: CLIENT_ID,
        Username: user
    };
    const command = new ForgotPasswordCommand(input);
    return await client.send(command);
};


/**
 * Resets a user's password in AWS Cognito.
 * @param {string} user - The username of the user.
 * @param {string} newPassword - The new password for the user.
 * @param {string} confirmationCode - The confirmation code for password reset.
 * @returns {Promise<Object>} A promise with cognito response object.
 * @throws {UserNotFoundException} If the user does not exist
 * @throws {ExpiredCodeException} It the confirmation code has expired
 */
const _cognitoResetPassword = async (user, newPassword, confirmationCode) => {
    const client = new CognitoIdentityProviderClient({region: AWS_REGION});
    const input = {
        ClientId: CLIENT_ID,
        ConfirmationCode: confirmationCode,
        Password: newPassword,
        Username: user
    };
    const command = new ConfirmForgotPasswordCommand(input);
    return await client.send(command);
};


/**
 * @typedef {Object} LoginData
 * @property {string} token - The authentication token.
 * @property {boolean} error - Indicates if there was an error during login.
 * @property {string} message - A message related to the login operation.
 * @property {string} session - The session information.
 */


/**
 * Authenticates a user, handles different authentication scenarios.
 * @param {string} user - The username of the user.
 * @param {string} password - The password of the user.
 * @param {Function} requestLogin - The function to perform login request.
 * @returns {Promise<LoginData>} A promise resolving to login data.
 */
export const logInUser = async (user, password, requestLogin = _cognitoLogin) => {
    // If a user has just been created a password will be assigned to him. Then he will be
    // requested to update its password.
    // If he has already updated his password he can log in normally.
    const loginData = {
        token: "",
        error: false,
        message: "",
        session: ""
    }

    try {
        const response = await requestLogin(user, password);

        if (response?.AuthenticationResult !== undefined){
            loginData.token = response.AuthenticationResult.IdToken;
        } else if (response?.ChallengeName === "NEW_PASSWORD_REQUIRED") {
            loginData.session = response.Session;
        }

    } catch (error) {
        loginData.error = true;

        if (error instanceof NotAuthorizedException || error instanceof UserNotFoundException){
            loginData.message = "Usuario o contraseña inválidos";
        } else {
            console.error("Unexpected login error: ", error);
            loginData.message = "Error al iniciar sesión";
        }
    }
    return loginData;
};


/**
 * Updates a user's password in AWS Cognito.
 * @param {string} user - The username of the user.
 * @param {string} newPassword - The new password for the user.
 * @param {string} session - The session information.
 * @param {Function} updatePassword - The function to perform password update.
 * @returns {Promise<LoginData>} A promise resolving to login data.
 */
export const updateUserPassword = async (
    user,
    newPassword,
    session,
    updatePassword = _cognitoUpdatePassword) => {

    const loginData = {
        token: "",
        error: false,
        message: ""
    }

    try {
        const response = await updatePassword(user, newPassword, session);
        loginData.token = response.AuthenticationResult.IdToken;
    } catch (error) {
        console.error("Error updating password: ", error);
        loginData.error = true;
        loginData.message = error.message;
    }
    return loginData;
};


/**
 * Requests a password reset for a user in AWS Cognito.
 * @param {string} user - The username of the user.
 * @param {Function} requestReset - The function to perform password reset request.
 * @returns {Promise<boolean>} A promise resolving to true if the request was successful, false otherwise.
 */
export const requestPasswordReset = async (
    user, requestReset = _cognitoRequestPasswordReset) => {
    try {
        const response = await requestReset(user);
        if (response?.CodeDeliveryDetails) {
            return true;
        }
    } catch (error) {
        console.error("Error requesting password reset: ", error);
    }
    return false;
};


/**
 * Resets a user's password in AWS Cognito.
 * @param {string} user - The username of the user.
 * @param {string} newPassword - The new password for the user.
 * @param {string} confirmationCode - The confirmation code for password reset.
 * @param {Function} resetPassword - The function to perform password reset.
 * @returns {Promise<boolean>} A promise resolving to true if the password reset was successful, false otherwise.
 */
export const resetUserPassword = async (
    user,
    newPassword,
    confirmationCode,
    resetPassword = _cognitoResetPassword
) => {
    try {
        await resetPassword(user, newPassword, confirmationCode);
        return true;
    } catch(error) {
        console.error(error);
        return false;
    }
};
