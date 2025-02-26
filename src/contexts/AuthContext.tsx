import { UsersType } from "@/types/UserTypes";
import { createContext, ReactNode, useEffect, useState } from "react";

type AuthContextType = {
  user: UsersType | null;
  setUser: (user: UsersType | null) => void;
  loading: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UsersType | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserLogged = () => {
    const storedUser = localStorage.getItem("@LoggedUser");

    return storedUser ? JSON.parse(storedUser) : null;
  };
  useEffect(() => {
    setUser(getUserLogged());
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
