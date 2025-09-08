import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
// import { fetchUserById } from "@services/api";
import type { User } from "@/types/User";
import { UserDetails } from "@components/UserDetails";
import { Spinner } from "@components/UI/Spinner";
import { toast } from "react-toastify";

export const UserDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   if (!id) return;
  //   fetchUserById(Number(id))
  //     .then(setUser)
  //     .catch((err) => toast.error(`Failed to load users: ${err.message}`))
  //     .finally(() => setLoading(false));
  // }, [id]);

  if (loading) return <Spinner />;
  if (!user) return <div role="alert">User not found.</div>;

  return <UserDetails user={user} />;
};
