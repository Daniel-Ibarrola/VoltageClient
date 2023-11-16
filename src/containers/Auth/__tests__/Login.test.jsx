import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { NotAuthorizedException } from "@aws-sdk/client-cognito-identity-provider";

import { Login } from "../Login.jsx";
import { logInUser } from "../../../services/index.js";


vi.mock("../../../services/index.js", () => ({
    logInUser: vi.fn()
}));


const waitForFormSubmission = async (promise) => {
    fireEvent.change(screen.getByPlaceholderText("Email"), {
        target: {value: "triton@example.com"}
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
        target: {value: "6MonkeysRLooking^"}
    });
    fireEvent.click(screen.getAllByRole("button")[0]);
    await waitFor(async () => await promise);
}


describe("Login", () => {
    it("Successful login", async () => {
        const response = {
            ChallengeParameters: {},
            AuthenticationResult: {
                AccessToken: "FakeAccessToken",
                ExpiresIn: 3600,
                TokenType: "Bearer",
                RefreshToken: "FakeRefreshToken",
                IdToken: "FakeIdToken"
            }
        };
        const promise = Promise.resolve(response);
        logInUser.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Login /></BrowserRouter>);
        await waitForFormSubmission(promise);

        expect(screen.queryByText(/Cuenta/)).toBeInTheDocument();
    });

    it("Invalid credentials display error", async () => {
        logInUser.mockImplementationOnce(() => { throw NotAuthorizedException });

        render(<BrowserRouter><Login /></BrowserRouter>);
        fireEvent.change(screen.getByPlaceholderText("Email"), {
            target: {value: "triton@example.com"}
        });
        fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
            target: {value: "6MonkeysRLooking^"}
        });
        fireEvent.click(screen.getAllByRole("button")[0]);

        expect(screen.queryByText(/Usuario o contraseña inválidos/)).toBeInTheDocument();
    });

    it("New user needs to update password", async () => {
        const response = {
            ChallengeName: "NEW_PASSWORD_REQUIRED",
            Session: "FakeSession",
            ChallengeParameters: {},
        }
        const promise = Promise.resolve(response);
        logInUser.mockImplementationOnce(() => promise);

        render(<BrowserRouter><Login /></BrowserRouter>);

        await waitForFormSubmission(promise);
        expect(screen.queryByText(/debe actualizar su contraseña/));
    });

});
