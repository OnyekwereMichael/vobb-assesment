// Settings.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { Settings } from "../../src/pages/Settings";

// Mock Firebase auth
vi.mock("../../src/components/Firebase/firebase", () => ({
  auth: {
    currentUser: {
      displayName: "John Doe",
      email: "john@example.com",
    },
  },
}));

// Mock useTheme
const mockSetTheme = vi.fn();
vi.mock("@/components/theme/ThemeProvider", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: mockSetTheme,
  }),
}));

// Mock BackButton
vi.mock("@/components/Backbutton", () => ({
  BackButton: () => <button>Back</button>,
}));

describe("Settings Component", () => {
  const renderSettings = () =>
    render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    );

  it("renders the Settings header", () => {
    renderSettings();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(
      screen.getByText("Manage your account and application preferences")
    ).toBeInTheDocument();
  });

  it("renders BackButton", () => {
    renderSettings();
    expect(screen.getByText("Back")).toBeInTheDocument();
  });

  it("renders user name from Firebase", () => {
    renderSettings();
    expect(screen.getByText(/Name: John Doe/)).toBeInTheDocument();
  });

  it("renders Appearance card", () => {
    renderSettings();
    expect(screen.getByText("Appearance")).toBeInTheDocument();
    expect(
      screen.getByText("Customize how Vobb looks and feels")
    ).toBeInTheDocument();
  });

  it("calls setTheme when clicking Light button", () => {
    renderSettings();
    fireEvent.click(screen.getByRole("button", { name: /Light/i }));
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("calls setTheme when clicking Dark button", () => {
    renderSettings();
    fireEvent.click(screen.getByRole("button", { name: /Dark/i }));
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });

  it("renders Dashboard Preferences card", () => {
    renderSettings();
    expect(screen.getByText("Dashboard Preferences")).toBeInTheDocument();
    expect(
      screen.getByText("Configure your dashboard view and data display")
    ).toBeInTheDocument();
  });

  it("renders Notifications options", () => {
    renderSettings();
    expect(screen.getByText("Deal Updates")).toBeInTheDocument();
    expect(screen.getByText("Email Digest")).toBeInTheDocument();
    expect(screen.getByText("Mobile Alerts")).toBeInTheDocument();
    expect(screen.getByText("Weekly Reports")).toBeInTheDocument();
  });

  it("renders Privacy & Security section", () => {
    renderSettings();
    expect(screen.getByText("Privacy & Security")).toBeInTheDocument();
    expect(screen.getByText("Two-Factor Authentication")).toBeInTheDocument();
    expect(screen.getByText("Export Data")).toBeInTheDocument();
    expect(screen.getByText("Clear Preferences")).toBeInTheDocument();
  });

  it("renders Account Management section", () => {
    renderSettings();
    expect(screen.getByText("Account Management")).toBeInTheDocument();
    expect(screen.getByText("Account Status")).toBeInTheDocument();
    expect(screen.getByText("Change Password")).toBeInTheDocument();
  });

  it("renders Export and Clear buttons", () => {
    renderSettings();
    expect(
      screen.getByRole("button", { name: /Export/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Clear/i })).toBeInTheDocument();
  });

  it("renders Change Password button", () => {
    renderSettings();
    expect(
      screen.getByRole("button", { name: /Change/i })
    ).toBeInTheDocument();
  });
});
