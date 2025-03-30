"use client";

import { getLoggedUser } from "@/actions/get-logged-user";
import LoginUser from "@/actions/loginUser";
import { UsersType } from "@/types/UserTypes";
import { createContext, ReactNode, useEffect, useState } from "react";

type LoggedUserType = {
  user: UsersType | null;
  setUser: (user: UsersType | null) => void;
  loading: boolean;
  login: (userToSave: UsersType) => void;
  logout: () => void;
};

export const LoggedUserContext = createContext<LoggedUserType | null>(null);

export default function LoggedUserProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<UsersType | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (userToSave: UsersType) => {
    LoginUser(userToSave);
    setUser(userToSave);
  };

  const logout = () => {
    localStorage.removeItem("@LoggedUser");
    setUser(null);
  };

  useEffect(() => {
    setUser(getLoggedUser());
    setLoading(false);
  }, []);

  return (
    <LoggedUserContext.Provider
      value={{ user, setUser, loading, login, logout }}
    >
      {children}
    </LoggedUserContext.Provider>
  );
}
