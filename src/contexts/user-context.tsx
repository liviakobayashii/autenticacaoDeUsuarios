"use client";

import { getLoggedUser } from "@/actions/get-logged-user";
import { UsersType } from "@/types/UserTypes";
import { createContext, ReactNode, useEffect, useState } from "react";

type LoggedUserType = {
  user: UsersType | null;
  setUser: (user: UsersType | null) => void;
  loading: boolean;
};

export const LoggedUserContext = createContext<LoggedUserType | null>(null);

export default function LoggedUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UsersType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUser(getLoggedUser());
    setLoading(false);
  }, []);

  return (
    <LoggedUserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </LoggedUserContext.Provider>
  );
}
