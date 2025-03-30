"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import FormCadastro from "@/components/form-cadastro";
import MobileCard from "@/components/mobile-card";

export default function SignIn() {
  return (
    <section className="flex w-full h-full">
      <div className="hidden lg:flex w-screen h-screen bg-slate-200 items-center justify-center">
        <img src="../../../signin.png" alt="" className="h-screen w-screen" />
      </div>
      <div className="flex flex-col h-screen w-screen bg-slate-200 md:bg-blue-600 justify-center items-center">
        <Card className="hidden md:block m-4 border h-auto">
          <CardHeader>
            <CardTitle className="text-3xl text-blue-600">
              Área de cadastro
            </CardTitle>
            <CardDescription>Faça seu cadastro agora mesmo!</CardDescription>
          </CardHeader>
          <CardContent>
            <FormCadastro />
          </CardContent>
        </Card>
        <MobileCard
          title="Área de cadastro"
          description="Faça seu cadastro agora mesmo!"
        >
          <FormCadastro />
        </MobileCard>
      </div>
    </section>
  );
}
