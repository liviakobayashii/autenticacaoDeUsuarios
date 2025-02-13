"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getUsers = () => {
    const storedUsers = localStorage.getItem("@Users");

    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  const router = useRouter();

  const addUser = () => {
    if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      const users = getUsers();

      const newUser = { name, email, password };

      users.push(newUser);

      localStorage.setItem("@Users", JSON.stringify(users));

      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form
        className="flex flex-col border border-white/30 w-96 h-96 rounded-md p-4 gap-3 justify-center items-center "
        id="signInId"
      >
        <h1 className="font-bold text-xl mb-3">Faça seu cadastro!</h1>
        <input
          value={name}
          type="text"
          placeholder="Digite seu nome"
          className="w-full p-3 rounded-md bg-white/90 outline-none text-black"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Button type="button" onClick={addUser} />
      </form>
    </div>
  );
}
