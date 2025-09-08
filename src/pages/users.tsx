import { useEffect } from "react";
import { useGetUsersQuery } from "@/services/api";
import type { User } from "@/types/User";
import { Spinner } from "@components/UI/Spinner";
import { Users } from "@components/Users";
import { toast } from "react-toastify";

export const UsersPage = () => {
  const { data: users, isLoading, error } = useGetUsersQuery();

  useEffect(() => {
    if (error) {
      toast.error("Failed to load users. Please try again.");
    }
  }, [error]);

  if (isLoading) return <Spinner />;

  if (error) return <div role="alert">Users not found.</div>;

  return <Users users={users as User[]} />;
};
