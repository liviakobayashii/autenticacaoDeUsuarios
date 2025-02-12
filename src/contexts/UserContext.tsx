import { UsersType } from "@/types/UserTypes";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type UserContextType = {
  data: UsersType[];
  setData: (name: string, email: string, password: string) => void;
};

export const UserContext = createContext<UserContextType | null>(null);
let getUsers = JSON.parse(localStorage.getItem("@Users") || "[]");

export default function UserProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(getUsers);

  return (
    <UserContext.Provider value={{ data, setData }}>
      {children}
    </UserContext.Provider>
  );
}
export const useUser = () => useContext(UserContext);
