import { useMemo } from "react";
import type { User } from "../types/user";

/**
 * Hook for filtering users by interest
 * Uses useMemo for performance optimization with large datasets
 */
export function useFilteredUsers(users: User[], filter: string): User[] {
  return useMemo(() => {
    const trimmedFilter = filter.trim().toLowerCase();

    if (!trimmedFilter) {
      return users;
    }

    return users.filter((user) =>
      user.interests.some((interest) =>
        interest.toLowerCase().includes(trimmedFilter)
      )
    );
  }, [users, filter]);
}
