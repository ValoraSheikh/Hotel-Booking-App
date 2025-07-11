import { useState, useEffect } from "react";
import { User } from "../types";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch("/api/admin/users")
      .then((res) => res.json())
      .then((data) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const usersWithDate = data.map((user: any) => ({
          ...user,
          createdAt: new Date(user.createdAt),
        }));
        setUsers(usersWithDate);
      });
  }, []);

  console.log("Here are the", users);
  

  return { users, setUsers };
};