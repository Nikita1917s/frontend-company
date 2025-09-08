import { render, screen } from "@testing-library/react";
import { useGetUsersQuery } from "@/services/api";
import { toast } from "react-toastify";
import type { User } from "@/types/User";
import { UsersPage } from "@/pages/users";

jest.mock("@/services/api", () => ({
  useGetUsersQuery: jest.fn(),
}));

jest.mock("@components/UI/Spinner", () => ({
  Spinner: () => <div data-testid="spinner">Spinner</div>,
}));

jest.mock("@components/Users", () => ({
  Users: ({ users }: { users: User[] }) => (
    <div data-testid="users-component">USERS:{users.length}</div>
  ),
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn() },
}));

const mockUseGetUsersQuery = useGetUsersQuery as jest.Mock;
const mockToastError = toast.error as jest.Mock;

describe("UsersPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("shows spinner while loading", () => {
    mockUseGetUsersQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    render(<UsersPage />);
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("toasts and shows alert on error", () => {
    mockUseGetUsersQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500 },
    });

    render(<UsersPage />);

    expect(mockToastError).toHaveBeenCalledWith(
      "Failed to load users. Please try again."
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Users not found.");
  });

  it("renders Users component with data", () => {
    const users: User[] = [
      {
          id: 1, firstName: "Jane", lastName: "Doe", email: "jane@ex.com",
          gender: "",
          country: "",
          city: "",
          state: "",
          postCode: "",
          street: "",
          streetNumber: "",
          orders: []
      },
      {
          id: 2, firstName: "John", lastName: "Smith", email: "john@ex.com",
          gender: "",
          country: "",
          city: "",
          state: "",
          postCode: "",
          street: "",
          streetNumber: "",
          orders: []
      },
    ];

    mockUseGetUsersQuery.mockReturnValue({
      data: users,
      isLoading: false,
      error: undefined,
    });

    render(<UsersPage />);
    const usersComp = screen.getByTestId("users-component");
    expect(usersComp).toHaveTextContent("USERS:2");
  });
});
