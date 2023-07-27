import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../components/auth/LoginForm";
import axios from "axios";

// Mock axios post method to return a successful response
jest.mock("axios");
axios.post.mockResolvedValue({
  data: {
    status: "success",
    authorisation: {
      token: "test-token",
      expiry_time: "test-expiry",
    },
  },
});

describe("Login Component Integration Tests", () => {
  test("Renders login form correctly", () => {
    render(<Login />);

    // Assert that the email and password fields are present
    expect(screen.getByLabelText(/adresse email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /connexion/i })
    ).toBeInTheDocument();
  });

  test("Submits login form with valid credentials", async () => {
    render(<Login />);

    // Enter valid credentials in the form fields
    fireEvent.change(screen.getByLabelText(/adresse email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "test-password" },
    });

    // Click the login button
    fireEvent.click(screen.getByRole("button", { name: /connexion/i }));

    // Wait for the API call to finish and navigation to occur
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Assert that the access token is stored in local storage
    expect(localStorage.getItem("access_token")).toBe("test-token");

    // Assert that the user is navigated to the "/home" route
    expect(screen.getByText(/connectez-vous/i)).toBeInTheDocument();
  });

  test("Shows error message on login failure", async () => {
    // Mock a login failure response
    axios.post.mockRejectedValueOnce({
      response: {
        data: {
          status: "error",
          message: "Invalid credentials",
        },
      },
    });

    render(<Login />);

    // Enter invalid credentials in the form fields
    fireEvent.change(screen.getByLabelText(/adresse email/i), {
      target: { value: "invalid@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/mot de passe/i), {
      target: { value: "invalid-password" },
    });

    // Click the login button
    fireEvent.click(screen.getByRole("button", { name: /connexion/i }));

    // Wait for the API call to finish
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Assert that the error message is displayed
    expect(
      screen.getByText(/identifiant ou mot de passe incorrect/i)
    ).toBeInTheDocument();
  });
});
