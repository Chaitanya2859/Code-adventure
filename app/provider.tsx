"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";
import axios from 'axios'
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Header from "./components/Header";
import { usePathname } from "next/navigation";


export default function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

const {user}= useUser();
const pathname = usePathname();
const hiddenHeader = pathname.includes('/practice/');

const [userDetail,setUserDetail]= useState()

  const hasCreatedUser = React.useRef(false);

  useEffect(() => {
    if (user && !hasCreatedUser.current) {
      hasCreatedUser.current = true;
      createNewUser();
    }
  }, [user]);

  const createNewUser = async () => {
    const result = await axios.post('/api/user/', {});
    setUserDetail(result?.data);
  }

  return (
    <NextThemesProvider {...props}>
        <UserDetailsContext.Provider value={{userDetail,setUserDetail}}>
            {!hiddenHeader && (
              <div className="flex flex-col items-center">
                <Header />
              </div>
            )}
      {children}
      </UserDetailsContext.Provider>
    </NextThemesProvider>
  );
}
