import {
    CognitoIdentityProviderClient,
    ConfirmForgotPasswordCommand,
    ForgotPasswordCommand,
    InitiateAuthCommand,
    NotAuthorizedException,
    RespondToAuthChallengeCommand,
    UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";

const CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;

const _cognitoLogin = async (user, password) => {
    // Make a request to AWS Cognito to authenticate a user
    const client = new CognitoIdentityProviderClient({region: "us-east-2"});
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


const _cognitoUpdatePassword = async (user, newPassword, session) => {
    // When a new user is created, Cognito requires him to update its password before he can login.
    const client = new CognitoIdentityProviderClient({region: "us-east-2"});
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


const _cognitoRequestPasswordReset = async (user) => {
    // Request a password reset for a forgotten password.
    const client = new CognitoIdentityProviderClient()
    const input = {
        ClientId: CLIENT_ID,
        Username: user
    };
    const command = new ForgotPasswordCommand(input);
    return await client.send(command);
};


const _cognitoResetPassword = async (user, newPassword, confirmationCode) => {
    // Reset a user passwords after they requested a password reset.
    const client = new CognitoIdentityProviderClient()
    const input = {
        ClientId: CLIENT_ID,
        ConfirmationCode: confirmationCode,
        Password: newPassword,
        Username: user
    };
    const command = new ConfirmForgotPasswordCommand(input);
    return await client.send(command);
};


export const logInUser = async (user, password, requestLogin = _cognitoLogin) => {
    // Authenticate a user.
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
}
