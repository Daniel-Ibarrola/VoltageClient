import {
    CognitoIdentityProviderClient,
    ConfirmForgotPasswordCommand,
    ForgotPasswordCommand,
    InitiateAuthCommand,
    NotAuthorizedException,
    RespondToAuthChallengeCommand,
    SignUpCommand,
    UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";

const CLIENT_ID = import.meta.env.COGNITO_CLIENT_ID


export const signUpUser = async (user, password) => {
    const client = new CognitoIdentityProviderClient()
    const input = {
        ClientId: CLIENT_ID,
        Username: user,
        Password: password,
    };
    const command = new SignUpCommand(input);
    return await client.send(command);
}


export const requestLogin = async (user, password) => {
    // Make a request to AWS Cognito to authenticate a user
    const client = new CognitoIdentityProviderClient()
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


export const logInUser = async (user, password, _requestLogin = requestLogin) => {
    const loginData = {
        token: "",
        error: false,
        message: "",
        session: ""
    }

    try {
        const response = await _requestLogin(user, password);

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

export const setNewPassword = async (user, newPassword, session) => {
    // Set a new password for a new user.
    const client = new CognitoIdentityProviderClient()
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


export const requestPasswordReset = async (user) => {
    const client = new CognitoIdentityProviderClient()
    const input = {
        ClientId: CLIENT_ID,
        Username: user
    };
    const command = new ForgotPasswordCommand(input);
    return await client.send(command);
};


export const updatePassword = async (user, newPassword, confirmationCode) => {
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

