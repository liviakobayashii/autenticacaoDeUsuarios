"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const getUsers = () => {
    const storedUsers = localStorage.getItem("@Users");

    return storedUsers ? JSON.parse(storedUsers) : [];
  };

  const router = useRouter();

  const addUser = () => {
    if (name.trim() !== "" && email.trim() !== "" && password.trim() !== "") {
      const users = getUsers();

      const emailExists = users.some((item: User) => item.email === email);

      if (emailExists) {
        setError("Esse email já foi cadastrado. Faça o logIn");
        return;
      }

      setError("");
      const id = users.length + 1;
      const newUser = { id, name, email, password };
      users.push(newUser);
      localStorage.setItem("@Users", JSON.stringify(users));
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <form
        className="flex flex-col border border-white/30 w-96 h-auto rounded-md p-4 gap-3 justify-center items-center "
        id="signInId"
      >
        {error && (
          <div className="bg-red-400 text-black border border-red-800 rounded-md p-3 mb-4">
            {error}
          </div>
        )}

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

        <p className=" mt-4 text-sm" onClick={() => router.push("/cadastro")}>
          Já tem uma conta? Então faça o{" "}
          <span className="cursor-pointer hover:text-blue-700 duration-200">
            LogIn
          </span>{" "}
          agora mesmo!
        </p>
      </form>
    </div>
  );
}
