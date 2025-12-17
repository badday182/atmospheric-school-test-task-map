import type { User } from "../types/user";
// import inputLettersForSearching from "@/constants/inputLettersForSearching";

export function useFilteredUsers(users: User[], filter: string): User[] {
  const trimmedFilter = filter.trim().toLowerCase();

  if (!trimmedFilter || trimmedFilter.length < 3) {
    return users;
  }

  return users.filter((user) =>
    user.interests.some((interest) =>
      interest.toLowerCase().includes(trimmedFilter)
    )
  );
}
