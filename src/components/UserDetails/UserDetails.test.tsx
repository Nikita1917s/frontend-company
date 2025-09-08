
import { render, screen } from "@testing-library/react";
import { useParams } from "react-router-dom";
import {
  useGetUserByEmailQuery,
  useGetOrdersByNumbersQuery,
} from "@/services/api";
import { toast } from "react-toastify";

import type { User } from "@/types/User";
import type { Order } from "@/types/Order";
import { UserDetailsPage } from "@/pages/userDetails";

jest.mock("@/services/api", () => ({
  useGetUserByEmailQuery: jest.fn(),
  useGetOrdersByNumbersQuery: jest.fn(),
}));

beforeEach(() => {
  (useGetOrdersByNumbersQuery as jest.Mock).mockReturnValue({
    data: [],
    isLoading: false,
    error: undefined,
  });
  (useGetUserByEmailQuery as jest.Mock).mockReturnValue({
    data: undefined,
    isLoading: false,
    error: undefined,
  });
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

jest.mock("@/services/api", () => ({
  useGetUserByEmailQuery: jest.fn(),
  useGetOrdersByNumbersQuery: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: { error: jest.fn() },
}));

jest.mock("@components/UI/Spinner", () => ({
  Spinner: () => <div>Spinner</div>,
}));

jest.mock("@components/UserDetails", () => ({
  UserDetails: ({ user, orders }: { user: User; orders?: Order[] }) => (
    <div data-testid="user-details">
      <div>USER:{user?.email}</div>
      <div>ORDERS:{(orders ?? []).map((o) => o.number).join(",")}</div>
    </div>
  ),
}));

const mockUseParams = useParams as jest.Mock;
const mockUseGetUserByEmailQuery = useGetUserByEmailQuery as jest.Mock;
const mockUseGetOrdersByNumbersQuery = useGetOrdersByNumbersQuery as jest.Mock;
const mockToastError = toast.error as jest.Mock;

describe("UserDetailsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("shows invalid id when route param missing", () => {
    mockUseParams.mockReturnValue({ id: undefined });

    mockUseGetUserByEmailQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
    });

    render(<UserDetailsPage />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid user id.");
  });

  test("shows Spinner while user is loading", () => {
    mockUseParams.mockReturnValue({ id: encodeURIComponent("a@b.com") });

    mockUseGetUserByEmailQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    render(<UserDetailsPage />);
    expect(screen.getByText("Spinner")).toBeInTheDocument();
  });

  test("toasts on user error and shows 'User not found' when no user", () => {
    mockUseParams.mockReturnValue({ id: encodeURIComponent("a@b.com") });

    mockUseGetUserByEmailQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500 },
    });

    mockUseGetOrdersByNumbersQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined,
    });

    render(<UserDetailsPage />);

    expect(mockToastError).toHaveBeenCalledWith(
      "Failed to load user. Please try again."
    );

    expect(screen.getByRole("alert")).toHaveTextContent("User not found.");
  });

  test("shows Spinner while orders are loading when user has order numbers", () => {
    mockUseParams.mockReturnValue({ id: encodeURIComponent("a@b.com") });

    const user = { email: "a@b.com", orders: [11, 22, 33] };
    mockUseGetUserByEmailQuery.mockReturnValue({
      data: user,
      isLoading: false,
      error: undefined,
    });

    mockUseGetOrdersByNumbersQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
    });

    render(<UserDetailsPage />);
    expect(screen.getByText("Spinner")).toBeInTheDocument();
  });

  test("toasts on orders error but still renders user details (with empty orders)", () => {
    mockUseParams.mockReturnValue({ id: encodeURIComponent("a@b.com") });

    const user = { email: "a@b.com", orders: [11, 22] };
    mockUseGetUserByEmailQuery.mockReturnValue({
      data: user,
      isLoading: false,
      error: undefined,
    });

    mockUseGetOrdersByNumbersQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 500 },
    });

    render(<UserDetailsPage />);

    expect(mockToastError).toHaveBeenCalledWith(
      "Failed to load orders. Please try again."
    );

    const details = screen.getByTestId("user-details");
    expect(details).toHaveTextContent("USER:a@b.com");
    expect(details).toHaveTextContent("ORDERS:");
  });

  test("renders user details with fetched orders", () => {
    mockUseParams.mockReturnValue({ id: encodeURIComponent("a@b.com") });

    const user = { email: "a@b.com", orders: [11, 22, 33] };
    mockUseGetUserByEmailQuery.mockReturnValue({
      data: user,
      isLoading: false,
      error: undefined,
    });

    mockUseGetOrdersByNumbersQuery.mockReturnValue({
      data: [
        { id: "o1", number: 11, status: "done" },
        { id: "o2", number: 22, status: "pending" },
      ],
      isLoading: false,
      error: undefined,
    });

    render(<UserDetailsPage />);

    const details = screen.getByTestId("user-details");
    expect(details).toHaveTextContent("USER:a@b.com");
    expect(details).toHaveTextContent("ORDERS:11,22");
  });

  test("skips orders query when user has no orders field or empty array", () => {
    mockUseParams.mockReturnValue({ id: encodeURIComponent("a@b.com") });

    const user = { email: "a@b.com" }; // no orders
    mockUseGetUserByEmailQuery.mockReturnValue({
      data: user,
      isLoading: false,
      error: undefined,
    });


    mockUseGetOrdersByNumbersQuery.mockReturnValue({
      data: [],
      isLoading: false,
      error: undefined,
    });

    render(<UserDetailsPage />);

    const details = screen.getByTestId("user-details");
    expect(details).toHaveTextContent("USER:a@b.com");
    expect(details).toHaveTextContent("ORDERS:");
  });
});
