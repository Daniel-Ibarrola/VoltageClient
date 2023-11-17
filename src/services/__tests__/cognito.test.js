import { describe, expect, it} from "vitest";

import {logInUser} from "../cognito.js";

describe("logInUser", () => {

    it("Successful login returns token", async () => {
        const fakeRequestLogin = async (user, password) => {
            return {
                ChallengeParameters: {},
                AuthenticationResult: {
                    AccessToken: "FakeAccessToken",
                    ExpiresIn: 3600,
                    TokenType: "Bearer",
                    RefreshToken: "FakeRefreshToken",
                    IdToken: "FakeIdToken"
                }
            }
        };
        const loginInfo = await logInUser("TestUser", "TestPassword", fakeRequestLogin);
        expect(loginInfo).toStrictEqual({
            token: "FakeIdToken",
            error: false,
            message: "",
            session: ""
        });
    });

    it("Password update required", async () => {
        const fakeRequestLogin = async (user, password) => {
            return {
                ChallengeName: "NEW_PASSWORD_REQUIRED",
                Session: "FakeSession",
                ChallengeParameters: {},
            }
        };

        const loginInfo = await logInUser("TestUser", "TestPassword", fakeRequestLogin);
        expect(loginInfo).toStrictEqual({
            token: "",
            error: false,
            message: "",
            session: "FakeSession"
        });
    });

    // it("Unauthorized credentials returns error", async () => {
    //     const promise = Promise.reject(new NotAuthorizedException({message: "Unauthorized"}));
    //     requestLogin.mockImplementationOnce(() => promise);
    //
    //     const loginInfo = await logInUser("TestUser", "TestPassword");
    //     expect(loginInfo).toStrictEqual({
    //         token: "",
    //         error: true,
    //         message: "Usuario o contraseña inválidos",
    //         session: ""
    //     });
    // });
});
