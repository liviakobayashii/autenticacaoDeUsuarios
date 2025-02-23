"use client";
import Button from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useContext, useState } from "react";

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

  const userCtx = useContext(AuthContext);

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
        setError("Esse email já foi cadastrado. Faça o Login");
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

  if (userCtx?.user) {
    redirect("/dashboard");
  }

  return (
    <section className="flex w-full h-full">
      <div className="w-screen h-screen bg-slate-200 items-center justify-center">
        <img src="../../../signin.png" alt="" className="h-screen w-screen" />
      </div>

      <div className="flex flex-col h-screen w-screen bg-blue-600 justify-center items-center">
        <form
          className="flex flex-col bg-slate-200 border border-white/30 w-96 h-auto rounded-md p-5 gap-3 justify-center items-center "
          id="signInId"
        >
          {error && (
            <div className="bg-yellow-200 text-black border border-yellow-600 rounded-md p-3 mb-4">
              {error}
            </div>
          )}

          <h1 className="font-bold text-black text-2xl mb-3">
            Faça seu cadastro!
          </h1>
          <input
            value={name}
            type="text"
            placeholder="Nome completo"
            className="w-full p-3 rounded-md bg-white/90 outline-none text-black border border-gray-400"
            onChange={(e) => setName(e.target.value)}
          />
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
          <Button type="button" onClick={addUser} />
          <p
            className="text-black/60 mt-4 text-sm"
            onClick={() => router.push("/login")}
          >
            Já tem uma conta? Então faça o{" "}
            <span className="cursor-pointer hover:text-blue-700 duration-200 ">
              Login
            </span>{" "}
            agora mesmo!
          </p>
        </form>
      </div>
    </section>
  );
  // return (
  // );
}
