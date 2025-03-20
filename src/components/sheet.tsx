"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Icon } from "@iconify/react";
import AvatarIcon from "./avatar";
import { getLoggedUser } from "@/actions/get-logged-user";
import { useContext, useEffect } from "react";
import { LoggedUserContext } from "@/contexts/user-context";
import { useRouter } from "next/navigation";
export default function SheetMenu() {
  const userLoggedCtx = useContext(LoggedUserContext);
  const router = useRouter();

  useEffect(() => {
    console.log(userLoggedCtx?.user?.name);
  });
  const logout = () => {
    localStorage.removeItem("@LoggedUser");
    router.push("/login");
  };
  return (
    <Sheet>
      <SheetTrigger className="flex gap-3 justify-center items-center">
        <p className="text-sm">{userLoggedCtx?.user?.name}</p>
        <AvatarIcon />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl my-4 font-bold text-blue-600">
            Dados do usuário
          </SheetTitle>
          <SheetDescription className="flex flex-col gap-3">
            <div>
              <span className=" font-bold">Nome completo: </span>
              <p>{userLoggedCtx?.user?.name}</p>
            </div>
            <div>
              <span className="font-bold">E-mail: </span>
              <p>{userLoggedCtx?.user?.email}</p>
            </div>
            <hr className=" my-5" />
            <div className="flex gap-1 w-fit rounded-sm 0 hover:cursor-pointer duration-200 group">
              <Icon
                icon="material-symbols:logout-rounded"
                className="text-red-600 font-bold text-xl duration-200"
              />
              <p
                onClick={logout}
                className="text-red-600 group-hover:underline duration-200"
              >
                Logout
              </p>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
