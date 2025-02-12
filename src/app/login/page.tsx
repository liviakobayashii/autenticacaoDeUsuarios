"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type User = {
  email: string;
  password: string;
};

export default function LogIn() {
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

      localStorage.setItem("@LoggedUsers", JSON.stringify(foundUser));
      router.push("/dashboard");
    } else {
      setError(
        "Usuário não encontrado. Verifique seu email e senha ou cadastre-se."
      );
      console.log("erro");
    }
  };
  // const addUser = () => {
  //   if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {

  //     const newUser = { name, email, password };

  //     users.push(newUser);

  //     router.push("/login");
  //   }
  // };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form className="flex flex-col border border-white/30 w-96 h-96 rounded-md p-4 gap-3 justify-center items-center ">
        {error && (
          <div className="bg-red-400 text-black border border-red-800 rounded-md p-3 mb-4">
            {error}
          </div>
        )}
        <h1 className="font-bold text-xl mb-3">Faça seu Login!</h1>
        <input
          value={email}
          type="email"
          placeholder="Digite seu email"
          className="w-full p-3 rounded-md bg-white/90 outline-none text-black"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="Digite sua senha"
          className="w-full p-3 rounded-md bg-white/90 outline-none text-black"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="button" onClick={checkUser} />
      </form>
    </div>
  );
}
