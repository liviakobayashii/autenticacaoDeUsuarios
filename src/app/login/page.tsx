"use client";

import Button from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default function LogIn() {
  const userCtx = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const getUsers = () => {
    const storedUsers = localStorage.getItem("@Users");

    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  const checkUser = () => {
    const users = getUsers();

    const foundUser = users.find(
      (item: User) => item.email === email && item.password === password
    );

    if (foundUser) {
      setError("");

      userCtx?.setUser(foundUser);
      localStorage.setItem("@LoggedUser", JSON.stringify(foundUser));
      router.push("/dashboard");
    } else {
      setError(
        "Usuário não encontrado. Verifique seu email e senha novamente ou cadastre-se."
      );
    }
  };

  return (
    <section className="flex w-full h-full">
      <div className="w-screen h-screen bg-slate-200 items-center justify-center">
        <img src="../../../login.png" alt="" className="h-screen w-screen" />
      </div>

      <div className="flex flex-col h-screen w-screen bg-blue-600 justify-center items-center">
        <form className="flex flex-col bg-slate-200 border border-white/30 w-96 h-auto rounded-md p-5 gap-3 justify-center items-center ">
          {error && (
            <div className="bg-red-400 text-black border border-red-800 rounded-md p-3 mb-4">
              {error}
            </div>
          )}
          <h1 className="font-bold text-black text-2xl mb-3">
            Faça seu Login!
          </h1>
          <input
            value={email}
            type="email"
            placeholder="exemplo@email.com"
            className="w-full p-3 rounded-md bg-white/90 outline-none text-black border border-gray-400"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            value={password}
            type="password"
            placeholder="*****"
            className="w-full p-3 rounded-md bg-white/90 outline-none text-black border border-gray-400"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="button" onClick={checkUser} />
          <p
            className="text-black/60 mt-4 text-sm"
            onClick={() => router.push("/cadastro")}
          >
            Ainda não tem uma conta? Então faça o{" "}
            <span className="cursor-pointer hover:text-blue-700 duration-200 ">
              cadastro
            </span>{" "}
            agora mesmo!
          </p>
        </form>
      </div>
    </section>
  );
}
