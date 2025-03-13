"use client";

import { getLoggedUser, getUsers } from "@/components/getLocalStorage";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const userLoggedExist = getLoggedUser();
if (userLoggedExist) {
  redirect("/dashboard");
}

export default function LogIn() {
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
      const users = getUsers();

      const foundUser = users.find(
        (item: any) =>
          values.email === item.email && values.password === item.password
      );

      if (foundUser) {
        localStorage.setItem("@LoggedUser", JSON.stringify(foundUser));
        router.push("/dashboard");
      } else {
        alert("E-mail ou senha incorretos.");
      }
    }
  }

  return (
    <section className="flex justify-center items-center w-screen h-screen">
      <div className=" hidden lg:flex">
        <img src="../../../signin.png" alt="" className="h-screen w-screen" />
      </div>
      <div className=" m-auto bg-blue-600 h-screen w-screen justify-center items-center flex flex-col">
        <Card className="w-96 border h-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-600">
              Área de Login
            </CardTitle>
            <CardDescription>Faça seu Login agora mesmo!</CardDescription>
          </CardHeader>
          <CardContent>
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
                    className="cursor-pointer hover:text-blue-700 duration-200 font-bold"
                    onClick={() => router.push("/cadastro")}
                  >
                    cadastro
                  </span>{" "}
                  agora mesmo!
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
