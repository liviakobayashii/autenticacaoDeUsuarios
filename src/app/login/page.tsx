"use client";

import { getUsers } from "@/actions/get-users";
import LoginUser from "@/actions/loginUser";
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
import { LoggedUserContext } from "@/contexts/user-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function LogIn() {
  const router = useRouter();
  const userLoggedCtx = useContext(LoggedUserContext);
  if (userLoggedCtx?.loading) {
    return;
  }
  userLoggedCtx?.user && redirect("/dashboard");

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

      console.log("Usuários encontrados:", users);

      const foundUser = users.find(
        (item: any) =>
          values.email === item.email && values.password === item.password
      );
      console.log(foundUser);

      if (foundUser) {
        LoginUser(foundUser);
        router.push("/dashboard");
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
    <section className="flex">
      <div className=" hidden lg:flex w-screen h-screen bg-slate-200 items-center justify-center">
        <img src="../../../login.png" alt="" className="h-screen w-screen" />
      </div>
      <div className="flex flex-col h-screen w-screen bg-blue-600 justify-center items-center">
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
