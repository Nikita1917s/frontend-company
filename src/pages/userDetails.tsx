import { useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { UserDetails } from "@components/UserDetails";
import { Spinner } from "@components/UI/Spinner";
import { toast } from "react-toastify";
import {
  useGetOrdersByNumbersQuery,
  useGetUserByEmailQuery,
} from "@/services/api";

export const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const email = useMemo(() => (id ? decodeURIComponent(id) : ""), [id]);

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useGetUserByEmailQuery(email, {
    skip: !email,
  });

  const orderNumbers = user?.orders as number[] | undefined;

  const {
    data: orders,
    isLoading: ordersLoading,
    error: ordersError,
  } = useGetOrdersByNumbersQuery(orderNumbers ?? [], {
    skip: !orderNumbers || orderNumbers.length === 0,
  });

  useEffect(() => {
    if (userError) toast.error("Failed to load user. Please try again.");
  }, [userError]);

  useEffect(() => {
    if (ordersError) toast.error("Failed to load orders. Please try again.");
  }, [ordersError]);

  if (!email) return <div role="alert">Invalid user id.</div>;
  if (userLoading) return <Spinner />;
  if (!user) return <div role="alert">User not found.</div>;
  if (orderNumbers?.length && ordersLoading) return <Spinner />;

  return <UserDetails user={user} orders={orders ?? []} />;
};
