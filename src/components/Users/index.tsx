import { useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "@/types/User";
import styles from "./Users.module.scss";
import { NoPhotoIcon } from "@/assets/img";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

export interface UsersProps {
  users: User[];
}

export const Users = ({ users }: UsersProps) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return users;
    return users.filter((u) => u.firstName.toLowerCase().includes(f));
  }, [users, filter]);

  const { visibleCount, isEnd, sentinelRef } = useInfiniteScroll(
    filtered.length,
    { pageSize: 20 }
  );

  const visibleItems = filtered.slice(0, visibleCount);

  return (
    <div className={styles["wrapper"]}>
      <h1 className={styles["title"]}>Users List</h1>
      <div className={styles["searchField"]}>
        <input
          type="text"
          placeholder="Filter by name…"
          name="Filter"
          value={filter}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
          aria-label="Filter users by name"
        />
      </div>

      <div className={styles["userList"]}>
        {visibleItems.map((u) => (
          <div key={`${u.lastName}-${u.email}`} className={styles["userCard"]}>
            <NoPhotoIcon className={styles["profilePhoto"]} />
            <p className={styles["userName"]}>
              <span>Name: </span>
              {u.firstName}
            </p>
            <p className={styles["userEmail"]}>
              <span>Email: </span>
              {u.email}
            </p>
            <div className={styles["buttonWrapper"]}>
              <button onClick={() => navigate(`/users/${u.id}`)}>
                Details
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className={styles["notFound"]}>No users found.</p>
        )}

        {filtered.length > 0 && !isEnd && (
          <div
            ref={sentinelRef}
            className={styles["sentinel"]}
            aria-hidden="true"
          >
            Loading more…
          </div>
        )}

        {filtered.length > 0 && isEnd && (
          <div className={styles["endOfList"]} aria-hidden="true">
            You’ve reached the end.
          </div>
        )}
      </div>
    </div>
  );
};
