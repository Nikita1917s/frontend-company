import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Users, type UsersProps } from "./";

const mockUsers = [
  { id: 1, name: "Alice Wonderland", username: "alice" },
  { id: 2, name: "Bob Builder", username: "bob" },
] as UsersProps["users"];

describe("Users component", () => {
  const renderWithRouter = (ui: React.ReactElement) =>
    render(<MemoryRouter>{ui}</MemoryRouter>);

  it("renders all users initially", () => {
    renderWithRouter(<Users users={mockUsers} />);
    expect(screen.getByText("Alice Wonderland")).toBeInTheDocument();
    expect(screen.getByText("Bob Builder")).toBeInTheDocument();
  });

  it("filters the list as you type", () => {
    renderWithRouter(<Users users={mockUsers} />);

    const input = screen.getByRole("textbox", {
      name: /filter users by name/i,
    });
    fireEvent.change(input, { target: { value: "bob" } });

    expect(screen.queryByText("Alice Wonderland")).not.toBeInTheDocument();
    expect(screen.getByText("Bob Builder")).toBeInTheDocument();
  });

  it('shows "No users found" if filter matches none', () => {
    renderWithRouter(<Users users={mockUsers} />);

    const input = screen.getByRole("textbox", {
      name: /filter users by name/i,
    });
    fireEvent.change(input, { target: { value: "xyz" } });

    expect(screen.getByText(/no users found\./i)).toBeInTheDocument();
  });
});
