import { useEffect, useRef, useState, useCallback } from "react";

interface Options {
  pageSize?: number;
  disabled?: boolean;
  resetKey?: string | number | boolean;
}

export function useInfiniteScroll(
  totalCount: number,
  { pageSize = 20, disabled = false, resetKey }: Options = {}
) {
  const [visibleCount, setVisibleCount] = useState(() =>
    Math.min(pageSize, totalCount)
  );
  const [isEnd, setIsEnd] = useState(totalCount <= pageSize);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const lockRef = useRef(false);
  const lastTotalRef = useRef(totalCount);

  const loadMore = useCallback(() => {
    if (disabled || isEnd || lockRef.current) return;
    lockRef.current = true;
    setIsLoadingMore(true);

    // batch triggers to next tick (prevents rapid flips)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + pageSize, totalCount));
      setIsLoadingMore(false);
      lockRef.current = false;
    }, 0);
  }, [disabled, isEnd, pageSize, totalCount]);

  // Reset only when you explicitly change resetKey (e.g., new filter)
  useEffect(() => {
    setVisibleCount(Math.min(pageSize, totalCount));
    setIsEnd(totalCount <= pageSize);
    lockRef.current = false;
  }, [resetKey, pageSize, totalCount]);

  // If totalCount shrinks (data replaced), clamp; don't reset on growth
  useEffect(() => {
    if (totalCount < lastTotalRef.current) {
      setVisibleCount((prev) => Math.min(prev, Math.max(pageSize, totalCount)));
      setIsEnd(totalCount <= Math.max(pageSize, totalCount));
      lockRef.current = false;
    }
    lastTotalRef.current = totalCount;
  }, [totalCount, pageSize]);

  return { visibleCount, isEnd, isLoadingMore, loadMore };
}
