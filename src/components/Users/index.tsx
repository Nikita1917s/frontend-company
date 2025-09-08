import { forwardRef, useMemo, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { VirtuosoGrid } from "react-virtuoso";
import type { User } from "@/types/User";
import styles from "./Users.module.scss";
import { NoPhotoIcon } from "@/assets/img";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { GenderFilter } from "@components/GenderFilter";

export interface UsersProps {
  users: User[];
}

export const Users = ({ users }: UsersProps) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [filterCountry, setFilterCountry] = useState("");
  const [gender, setGender] = useState("");

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    const c = filterCountry.trim().toLowerCase();
    const g = gender.trim().toLowerCase();

    return users.filter((u) => {
      const matchesName = !f || u.firstName.toLowerCase().includes(f);

      const matchesCountry =
        !c || (u.country && u.country.toLowerCase().includes(c));

      const matchesGender = !g || (u.gender && u.gender.toLowerCase() === g);

      return matchesName && matchesCountry && matchesGender;
    });
  }, [users, filter, filterCountry, gender]);

  const { visibleCount, isEnd, isLoadingMore, loadMore } = useInfiniteScroll(
    filtered.length,
    { pageSize: 20, resetKey: `${filter}|${filterCountry}|${gender}` }
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Users List</h1>

      <div className={styles.searchField}>
        <input
          type="text"
          placeholder="Filter by name…"
          name="FilterName"
          value={filter}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
          aria-label="Filter users by name"
        />
      </div>

      <div className={styles.filterWrapper}>
        <div className={styles.filterItem}>
          <input
            type="text"
            placeholder="Filter by country…"
            name="FilterCountry"
            value={filterCountry}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFilterCountry(e.target.value)
            }
            aria-label="Filter users by country"
          />
        </div>
        <div className={styles.filterItem}>
          <GenderFilter gender={gender} setGender={setGender} />
        </div>
      </div>

      <div className={styles.listContainer} role="list">
        {filtered.length === 0 ? (
          <p className={styles.notFound}>No users found.</p>
        ) : (
          <VirtuosoGrid
            className={styles.scroller}
            style={{ height: "70vh" }}
            totalCount={visibleCount}
            endReached={() => {
              if (!isEnd && !isLoadingMore) loadMore();
            }}
            increaseViewportBy={{ top: 400, bottom: 400 }}
            computeItemKey={(index) => {
              const u = filtered[index];
              return u
                ? u.id ?? `${u.lastName}-${u.email}`
                : `skeleton-${index}`;
            }}
            components={{
              List: forwardRef<
                HTMLDivElement,
                React.HTMLAttributes<HTMLDivElement>
              >((props, ref) => (
                <div
                  {...props}
                  ref={ref}
                  className={styles.gridList}
                  role="grid"
                />
              )),
              Item: (props) => (
                <div {...props} className={styles.gridItem} role="gridcell" />
              ),
              Footer: () =>
                !isEnd ? (
                  <div className={styles.sentinel}>
                    {isLoadingMore ? "Loading more…" : "Scroll to load more…"}
                  </div>
                ) : (
                  <div className={styles.endOfList}>
                    You’ve reached the end.
                  </div>
                ),
            }}
            itemContent={(index) => {
              const u = filtered[index];
              if (!u) {
                return (
                  <div className={styles.userCardSkeleton}>
                    <div className={styles.profilePhotoSkeleton} />
                    <div className={styles.line} />
                    <div className={styles.line} />
                  </div>
                );
              }

              return (
                <div className={styles.userCard}>
                  <NoPhotoIcon className={styles.profilePhoto} />
                  <p className={styles.userName}>
                    <span>Name: </span>
                    {u.firstName}
                  </p>
                  <p className={styles.userEmail}>
                    <span>Email: </span>
                    {u.email}
                  </p>
                  {"country" in u && (
                    <p className={styles.userCountry}>
                      <span>Country: </span>
                      {u.country}
                    </p>
                  )}
                  {"gender" in u && (
                    <p className={styles.userGender}>
                      <span>Gender: </span>
                      {u.gender}
                    </p>
                  )}
                  <div className={styles.buttonWrapper}>
                    <button onClick={() => navigate(`/users/${u.email}`)}>
                      Details
                    </button>
                  </div>
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
};
