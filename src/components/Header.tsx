import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { Icon } from "@iconify/react";

export default function Header() {
  const userCtx = useContext(AuthContext);

  return (
    <header className="flex justify-between items-center bg-blue-600 h-24 p-3">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex gap-2">
        <Icon
          icon="qlementine-icons:user-16"
          className="text-white font-bold text-xl"
        />
        <p>{userCtx?.user?.name}</p>
      </div>
    </header>
  );
}
