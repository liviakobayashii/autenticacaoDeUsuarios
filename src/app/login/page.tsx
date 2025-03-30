"use client";
import FormLogin from "@/components/form-login";
import MobileCard from "@/components/mobile-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { LoggedUserContext } from "@/contexts/user-context";
import { redirect, useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function LogIn() {
  const router = useRouter();
  const userLoggedCtx = useContext(LoggedUserContext);

  useEffect(() => {
    if (userLoggedCtx?.user) {
      router.push("/dashboard");
      console.log("oi");
    }
  });

  // if (userLoggedCtx?.loading) {
  //   return;
  // }

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   if (values.email.trim() !== "" && values.password.trim() !== "") {
  //     const users = getUsers();

  //     const foundUser = users.find(
  //       (item: any) =>
  //         values.email === item.email && values.password === item.password
  //     );

  //     if (foundUser) {
  //       LoginUser(foundUser);
  //       router.push("/dashboard");
  //     } else {
  //       toast.custom(() => (
  //         <div className="bg-red-400 rounded-sm p-3">
  //           E-mail ou senha incorretos. Verifique e tente novamente.
  //         </div>
  //       ));
  //     }
  //   }
  // }
  return (
    <section className="flex">
      <div className=" hidden lg:flex w-screen h-screen bg-slate-200 items-center justify-center">
        <img src="../../../login.png" alt="" className="h-screen w-screen" />
      </div>
      <div className="flex flex-col h-screen w-screen bg-slate-200 md:bg-blue-600 justify-center items-center">
        <Card className="max-md:hidden w-96 border h-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-600">
              Área de Login
            </CardTitle>
            <CardDescription>Faça seu Login agora mesmo!</CardDescription>
          </CardHeader>
          <CardContent>
            <FormLogin />
          </CardContent>
        </Card>
        <MobileCard
          title="Área de Login"
          description="Faça seu Login agora mesmo!"
        >
          <FormLogin />
        </MobileCard>
      </div>
    </section>
  );
}
