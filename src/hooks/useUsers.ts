import { useState, useEffect } from "react";
import { fetchUsers } from "../api/usersApi";
import type { User } from "../types/user";

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useUsers = (): UseUsersReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error loading data");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    loading,
    error,
    refetch: loadUsers,
  };
};
