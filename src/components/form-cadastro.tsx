"use client";

import { useRouter } from "next/navigation";

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
import { getUsers } from "@/actions/get-users";
import SaveUser from "@/actions/save-user";

export default function FormCadastro() {
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
                <Input placeholder="Digite seu nome completo" {...field} />
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
            className="max-md:text-blue-600 cursor-pointer hover:text-blue-600 duration-200 font-bold"
            onClick={() => router.push("/login")}
          >
            Login
          </span>{" "}
          agora mesmo!
        </p>
      </form>
    </Form>
  );
}
