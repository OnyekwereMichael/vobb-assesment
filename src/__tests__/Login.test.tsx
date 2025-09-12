// __tests__/Login.basic.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Login } from "../../src/components/auth/Login";
import "@testing-library/jest-dom/vitest"

describe("Login Component - Basic UI", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

  it("renders the Sign In heading", () => {
    renderComponent();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
  });

  it("renders the email label", () => {
    renderComponent();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });

  it("renders the password label", () => {
    renderComponent();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("renders the Sign In button", () => {
    renderComponent();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("renders the create account link", () => {
    renderComponent();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });
});
