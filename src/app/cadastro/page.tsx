"use client";
// import Button from "@/components/Button";
import { AuthContext } from "@/contexts/AuthContext";
import { redirect, useRouter } from "next/navigation";
import { useContext } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { getUsers } from "@/components/getLocalStorage";

export default function SignIn() {
  const router = useRouter();

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (
      values.name.trim() !== "" &&
      values.email.trim() !== "" &&
      values.password.trim() !== ""
    ) {
      const users = getUsers();

      const emailExists = users.some(
        (item: any) => values.email === item.email
      );

      if (emailExists) {
        console.log("não pode adicionar");
      } else {
        users.push(values);
        localStorage.setItem("@Users", JSON.stringify(users));
        router.push("/login");
        toast("Cadastro efetuado com sucesso! Agora faça o login.");
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

//     const emailExists = users.some((item: User) => item.email === email);

//     if (emailExists) {
//       setError("Esse email já foi cadastrado. Faça o Login");
//       return;
//     }

//     const id = users.length + 1;
//     const newUser = { id, name, email, password };
//     users.push(newUser);
//     localStorage.setItem("@Users", JSON.stringify(users));
//     router.push("/login");
//   }
// };

// if (userCtx?.user) {
//   redirect("/dashboard");

// }
