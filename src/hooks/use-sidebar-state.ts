import { useState, useCallback, useEffect } from "react";

const SIDEBAR_STORAGE_KEY = "sidebar:state";

export function useSidebarState(defaultOpen: boolean = true) {
  // Initialize state from localStorage or default
  const [open, setOpenState] = useState<boolean>(() => {
    if (typeof window === "undefined") return defaultOpen;

    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) {
      return stored === "true";
    }
    return defaultOpen;
  });

  // Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(open));
  }, [open]);

  const setOpen = useCallback((value: boolean | ((prev: boolean) => boolean)) => {
    setOpenState((prev) => {
      const newValue = typeof value === "function" ? value(prev) : value;
      return newValue;
    });
  }, []);

  return { open, setOpen };
}
