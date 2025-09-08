import { memo, useCallback } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList, ListOnItemsRenderedProps, VariableSizeList } from "react-window";
import type { User } from "@/types/User";
import styles from "./Users.module.scss";
import { NoPhotoIcon } from "@/assets/img";
import { useNavigate } from "react-router-dom";

type Props = {
  users: User[];
  itemHeight?: number;
  overscanCount?: number;
  onNearEnd?: () => void;          // call to load more
  nearEndOffset?: number;          // how many items from end to trigger onNearEnd
};

export const VirtualizedUsersList = memo(function VirtualizedUsersList({
  users,
  itemHeight = 140,                // tweak to match your card height
  overscanCount = 6,
  onNearEnd,
  nearEndOffset = 8,
}: Props) {
  const navigate = useNavigate();

  const itemKey = useCallback(
    (index: number, data: User[]) => data[index]?.id ?? `${data[index]?.email}-${index}`,
    []
  );

  const Row = useCallback(
    ({ index, style, data }: { index: number; style: React.CSSProperties; data: User[] }) => {
      const u = data[index];
      return (
        <div style={style} className={styles["userCard"]}>
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
            <button onClick={() => navigate(`/users/${u.id}`)}>Details</button>
          </div>
        </div>
      );
    },
    [navigate]
  );

  const handleItemsRendered = useCallback(
    ({ visibleStopIndex }: ListOnItemsRenderedProps) => {
      if (!onNearEnd) return;
      if (users.length === 0) return;
      // when we scroll within `nearEndOffset` items of the end → load more
      if (visibleStopIndex >= users.length - nearEndOffset) {
        onNearEnd();
      }
    },
    [onNearEnd, users.length, nearEndOffset]
  );

  return (
    <div className={styles["listContainer"]}>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            width={width}
            height={height}
            itemCount={users.length}
            itemSize={itemHeight}
            itemData={users}
            overscanCount={overscanCount}
            onItemsRendered={handleItemsRendered}
            itemKey={itemKey}
          >
            {Row as any}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
});
