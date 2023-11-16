import {
    CognitoIdentityProviderClient,
    ConfirmForgotPasswordCommand,
    ForgotPasswordCommand,
    InitiateAuthCommand,
    RespondToAuthChallengeCommand,
    SignUpCommand
} from "@aws-sdk/client-cognito-identity-provider";

const CLIENT_ID = import.meta.env.COGNITO_CLIENT_ID;
const client = new CognitoIdentityProviderClient()


export const signUpUser = async (user, password) => {
    const input = {
        ClientId: CLIENT_ID,
        Username: user,
        Password: password,
    };
    const command = new SignUpCommand(input);
    return await client.send(command);
}


export const logInUser = async (user, password) => {
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


export const setNewPassword = async (user, newPassword, session) => {
    // Set a new password for a new user.
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
    const input = {
        ClientId: CLIENT_ID,
        Username: user
    };
    const command = new ForgotPasswordCommand(input);
    return await client.send(command);
};


export const updatePassword = async (user, newPassword, confirmationCode) => {
    const input = {
        ClientId: CLIENT_ID,
        ConfirmationCode: confirmationCode,
        Password: newPassword,
        Username: user
    };
    const command = new ConfirmForgotPasswordCommand(input);
    return await client.send(command);
};
