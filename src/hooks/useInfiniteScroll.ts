import { useEffect, useRef, useState, useCallback } from "react";

interface Options {
  pageSize?: number;
  disabled?: boolean;
}

export function useInfiniteScroll(
  totalCount: number,
  { pageSize = 20, disabled = false }: Options = {}
) {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isEnd, setIsEnd] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => {
      const next = Math.min(prev + pageSize, totalCount);
      if (next >= totalCount) setIsEnd(true);
      return next;
    });
  }, [pageSize, totalCount]);

  useEffect(() => {
    setVisibleCount(pageSize);
    setIsEnd(totalCount <= pageSize);
  }, [totalCount, pageSize]);

  useEffect(() => {
    if (disabled) return;

    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "200px 0px 0px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [disabled, loadMore]);

  return {
    visibleCount,
    isEnd,
    sentinelRef,
  };
}
