import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Navbar from "@/components/navbar";

jest.mock("next-auth/react");
import { useSession, signIn, signOut } from "next-auth/react";

const mockUseSession = useSession as jest.Mock;
(signIn as jest.Mock).mockImplementation(() => jest.fn());
(signOut as jest.Mock).mockImplementation(() => jest.fn());

describe("Navbar", () => {
  it("render the navbar with log out button if user authenticated", async () => {
    mockUseSession.mockReturnValue({
      status: "authenticated",
      data: true,
    });

    render(<Navbar />);

    const button = screen.getByRole("button", { name: "Log Out" });

    expect(button).toBeVisible();
  });
  it("render the navbar with log in button if no authenticated user", async () => {
    mockUseSession.mockReturnValue({
      status: "unauthenticated",
      data: null,
    });

    render(<Navbar />);

    const button = screen.getByRole("button", { name: "Log In" });

    expect(button).toBeVisible();
  });
});
