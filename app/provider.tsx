"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useUser } from "@clerk/nextjs";
import axios from 'axios'
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Header from "./components/Header";


export default function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

const {user}= useUser();

const [userDetail,setUserDetail]= useState()

useEffect(()=>{
    user&&createNewUser();
},[user])

const createNewUser= async ()=>{
    const result= await axios.post('/api/user/',{})
    console.log(result)
    setUserDetail(result?.data)
}

  return (
    <NextThemesProvider {...props}>
        <UserDetailsContext.Provider value={{userDetail,setUserDetail}}>
            <div className="flex flex-col items-center">
            <Header />
            </div>
      {children}
      </UserDetailsContext.Provider>
    </NextThemesProvider>
  );
}
