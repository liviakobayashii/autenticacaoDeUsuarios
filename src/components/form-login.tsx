"use client";

import { getUsers } from "@/actions/get-users";
import LoginUser from "@/actions/loginUser";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoggedUserContext } from "@/contexts/user-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function FormLogin() {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({
      message: "E-mail inválido. Verifique novamente",
    }),
    password: z
      .string()
      .min(2, {
        message: "A senha precisa ter no mínimo 2 caracteres",
      })
      .max(12),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.email.trim() !== "" && values.password.trim() !== "") {
      const users = getUsers(); // Recupera a lista de usuários

      const foundUser = users.find(
        (item: any) =>
          values.email === item.email && values.password === item.password
      );
      console.log(foundUser);
      if (foundUser) {
        LoginUser(foundUser); // Realiza o login do usuário
        router.push("/dashboard"); // Redireciona para o dashboard
      } else {
        toast.custom(() => (
          <div className="bg-red-400 rounded-sm p-3">
            E-mail ou senha incorretos. Verifique e tente novamente.
          </div>
        ));
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input placeholder="****" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Login</Button>
        <p className="text-black/60 mt-4 text-sm">
          Ainda não tem uma conta? Então faça o{" "}
          <span
            className="max-md:text-blue-600 cursor-pointer hover:text-blue-600 duration-200 font-bold"
            onClick={() => router.push("/cadastro")}
          >
            cadastro
          </span>{" "}
          agora mesmo!
        </p>
      </form>
    </Form>
  );
}
