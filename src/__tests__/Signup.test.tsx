// __tests__/Signup.simple.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Signup } from "../../src/components/auth/Signup";
import { expect, it, describe } from "vitest";
import "@testing-library/jest-dom/vitest"


describe("Signup Component - Simple Tests", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

  it("renders name input field", () => {
    renderComponent();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  });

  it("renders email input field", () => {
    renderComponent();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders password input field", () => {
    renderComponent();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders submit button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });

  it("toggles password visibility when clicking the eye button", () => {
    renderComponent();

    const passwordInput = screen.getByLabelText(/password/i) as HTMLInputElement;
    const toggleButton = screen.getByRole("button", { name: /toggle password visibility/i });

    // initial type should be password
    expect(passwordInput.type).toBe("password");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("text");

    fireEvent.click(toggleButton);
    expect(passwordInput.type).toBe("password");
  });

  it("renders link to login page", () => {
    renderComponent();
    const signInLink = screen.getByRole("link", { name: /sign in/i });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute("href", "/login");
  });

  it("renders all form fields and button together", () => {
    renderComponent();
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /create account/i })).toBeInTheDocument();
  });
});
