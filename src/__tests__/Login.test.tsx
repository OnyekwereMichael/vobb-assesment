// __tests__/Login.simple.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../../src/components/auth/Login";
import { describe, it, expect } from "vitest";

describe("Login Component - Simple Tests", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

  it("renders the Sign In title", () => {
    renderComponent();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("renders the email input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  });

  it("renders the password input", () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    renderComponent();
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("toggles password visibility", () => {
    renderComponent();
    const passwordInput = screen.getByPlaceholderText(/enter your password/i) as HTMLInputElement;
    const toggleButton = screen.getAllByRole("button")[0]; // first button is the eye toggle

    // initially password type
    expect(passwordInput.type).toBe("password");

    // click to show password
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    // click to hide password again
    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });
});
