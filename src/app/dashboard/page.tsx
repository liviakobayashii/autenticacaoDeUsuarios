"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default function Dashboard() {
  const userCtx = useContext(AuthContext);

  if (userCtx?.loading === true) {
    return (
      <div className="flex w-screen h-screen justify-center items-center">
        <h1 className="text-3xl font-bold">Carregando...</h1>
      </div>
    );
  } else {
    if (!userCtx?.user) {
      redirect("/login");
    }

    const logout = () => {
      localStorage.setItem("@LoggedUser", "");
      redirect("/login");
    };
    return (
      <div className="flex flex-col w-screen h-screen justify-center items-center">
        <div className=" flex flex-col gap-3 w-96 h-auto border border-white rounded-md p-4">
          <h1 className="text-lg mb-3 text-center">Dashboard</h1>
          <p>Nome do usuário: {userCtx?.user?.name}</p>
          <p>Email do usuário: {userCtx?.user?.email}</p>
          <button
            onClick={logout}
            className="border border-white bg-blue-500 text-white p-2 rounded-md hover:border-blue-700 hover:text-blue-700 duration-200 self-end"
          >
            Sair
          </button>
        </div>
      </div>
    );
  }
}
