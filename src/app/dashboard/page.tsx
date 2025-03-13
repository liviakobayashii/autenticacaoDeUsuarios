"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function Dashboard() {
  // const userCtx = useContext(AuthContext);

  // if (userCtx?.loading === true) {
  //   return (
  //     <div className="flex w-screen h-screen justify-center items-center">
  //       <h1 className="text-3xl font-bold">Carregando...</h1>
  //     </div>
  //   );
  // } else {
  //   if (!userCtx?.user) {
  //     redirect("/login");
  //   }

  //   const logout = () => {
  //     localStorage.removeItem("@LoggedUser");
  //     redirect("/login");
  //   };
  return (
    <h1>Dashboard</h1>
    // <>
    //   <Header />
    //   <section className="grid grid-cols-5 h-full">
    //     <section className="flex flex-col col-span-1 bg-neutral-200 h-[calc(100vh-96px)] justify-between pt-4 pb-4">
    //       <div>
    //         <div className="flex gap-1 p-3">
    //           <Icon
    //             icon="basil:user-outline"
    //             className="text-blue-600 font-bold text-xl"
    //           />
    //           <p className="text-black">{userCtx?.user?.name}</p>
    //         </div>
    //         <div className="flex gap-1 p-3">
    //           <Icon
    //             icon="ic:round-alternate-email"
    //             className="text-blue-600 font-bold text-xl"
    //           />
    //           <p className="text-black">{userCtx?.user?.email}</p>
    //         </div>
    //       </div>
    //       <div className="flex gap-1 p-3 cursor-pointer" onClick={logout}>
    //         <Icon
    //           icon="material-symbols:logout-rounded"
    //           className="text-blue-600 font-bold text-xl"
    //         />
    //         <p className="text-black">Sair</p>
    //       </div>
    //     </section>
    //     <div className="col-span-4 h-full ">oiee</div>
    //   </section>
    // </>
  );
}
// }
