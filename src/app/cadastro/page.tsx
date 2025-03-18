"use client";

import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoggedUserContext } from "@/contexts/user-context";
import { getUsers } from "@/actions/get-users";
import SaveUser from "@/actions/save-user";
import { getLoggedUser } from "@/actions/get-logged-user";

export default function SignIn() {
  const router = useRouter();
  const loggedUserCtx = useContext(LoggedUserContext);

  const userLoggedExist = getLoggedUser();
  useEffect(() => {
    if (userLoggedExist || loggedUserCtx?.user) {
      router.push("/dashboard");
    }
  }, [userLoggedExist, loggedUserCtx?.user, router]);

  const formSchema = z.object({
    name: z.string().trim().min(4, "O nome precisa ter no mínimo 4 letras."),
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
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      values.name.trim() !== "" &&
      values.email.trim() !== "" &&
      values.password.trim() !== ""
    ) {
      const users = await getUsers();
      const emailExists = users.some(
        (item: any) => values.email === item.email
      );

      if (emailExists) {
        toast.custom(() => (
          <div className="bg-yellow-200 rounded-sm p-3">
            Esse e-mail já foi cadastrado anteriormente. Favor realizar o login.
          </div>
        ));
      } else {
        users.push(values);
        SaveUser(users);
        router.push("/login");
        toast.custom(() => (
          <div className="bg-green-400 rounded-sm p-3">
            Cadastro realizado com sucesso. Faça o login agora mesmo!
          </div>
        ));
      }
    }
  }

  return (
    <section className="flex w-full h-full">
      <div className="hidden lg:flex w-screen h-screen bg-slate-200 items-center justify-center">
        <img src="../../../signin.png" alt="" className="h-screen w-screen" />
      </div>
      <div className="flex flex-col h-screen w-screen bg-blue-600 justify-center items-center">
        <Card className="w-96 border h-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-600">
              Área de cadastro
            </CardTitle>
            <CardDescription>Faça seu cadastro agora mesmo!</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite seu nome completo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        <Input
                          placeholder="Digite sua senha"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Cadastro</Button>
                <p className="text-black/60 mt-4 text-sm">
                  Já tem uma conta? Então faça o{" "}
                  <span
                    className="cursor-pointer hover:text-blue-700 duration-200 font-bold"
                    onClick={() => router.push("/login")}
                  >
                    Login
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
