import { describe, expect, it} from "vitest";

import {logInUser, updateUserPassword} from "../cognito.js";

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

    it("Login error", async () => {
        const fakeRequestLogin = async () => {
          throw new Error("Login error");
        };

        const loginInfo = await logInUser("TestUser", "TestPassword", fakeRequestLogin);
        expect(loginInfo).toStrictEqual({
            token: "",
            error: true,
            message: "Error al iniciar sesión",
            session: ""
        });
    });
});


describe("updateUserPassword", () => {
    it("Returns token if request is successful", async () => {
        const fakeUpdatePassword = async () => {
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

        const loginInfo = await updateUserPassword(
            "triton@example.com", "cat", "session", fakeUpdatePassword
        );
        expect(loginInfo).toStrictEqual({
           token: "FakeIdToken",
           error: false,
           message: ""
        });
    });

    it("Returns error message if request is unsuccessful", async () => {
        const errorMsg = "Failed to update password";
        const fakeUpdatePassword = () => {
            throw new Error(errorMsg);
        };
        const loginInfo = await updateUserPassword(
            "triton@example.com", "cat", "session", fakeUpdatePassword
        );
        expect(loginInfo).toStrictEqual({
            token: "",
            error: true,
            message: errorMsg
        });
    });
});

