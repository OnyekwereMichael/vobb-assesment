// Profile.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Profile } from "../../src/pages/Profile";
import { describe, expect, it, vi } from "vitest";

// Mock firebase auth
const mockSignOut = vi.fn();
vi.mock("../../src/components/Firebase/firebase", () => ({
  auth: {
    onAuthStateChanged: (cb: any) =>
      cb({
        displayName: "John Doe",
        email: "john@example.com",
        phoneNumber: "+123456789",
        metadata: { creationTime: "2025-01-01T00:00:00Z" },
        photoURL: "https://example.com/avatar.jpg",
      }),
    signOut: mockSignOut,
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Profile Component", () => {
  const renderProfile = () =>
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

  it("renders the user display name", () => {
    renderProfile();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the user role", () => {
    renderProfile();
    expect(screen.getByText("Sales Manager")).toBeInTheDocument();
  });

  it("renders the user email", () => {
    renderProfile();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("renders the company name", () => {
    renderProfile();
    expect(screen.getByText("Vobb Atlas")).toBeInTheDocument();
  });

  it("renders the phone number", () => {
    renderProfile();
    expect(screen.getByText("+123456789")).toBeInTheDocument();
  });

  it("renders the join date", () => {
    renderProfile();
    expect(screen.getByText(/Joined 1\/1\/2025/)).toBeInTheDocument();
  });

  it("renders the Edit button", () => {
    renderProfile();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  it("renders the Logout button", () => {
    renderProfile();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  });

  it("calls signOut when Logout is clicked", async () => {
    renderProfile();
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it("navigates to login page after logout", async () => {
    renderProfile();
    fireEvent.click(screen.getByRole("button", { name: /logout/i }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
});
