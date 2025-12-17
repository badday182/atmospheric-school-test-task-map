import type { User } from "../types/user";
import usersData from "../data/users.json";

/**
 * Mock API request to fetch the list of users
 * Simulates network delay and returns data from a local JSON file
 */
export const fetchUsers = async (): Promise<User[]> => {
  // Simulate network delay (500-1000ms)
  const delay = Math.random() * 500 + 500;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Simulate possible error (50% chance)
        if (Math.random() < 0.5) {
          reject(new Error("Failed to fetch users from server"));
        }
        // Return data as from a real API
        resolve(usersData as User[]);
      } catch (error) {
        reject(error);
      }
    }, delay);
  });
};
