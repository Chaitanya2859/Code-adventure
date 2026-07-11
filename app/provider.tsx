"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import axios from 'axios';
import { UserDetailsContext } from "@/context/UserDetailsContext";
import Header from "./components/Header";
import { usePathname } from "next/navigation";
import { SessionUser } from "@/lib/auth";

export default function Provider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {

  const pathname = usePathname();
  const hiddenHeader = pathname.includes('/practice/');

  const [userDetail, setUserDetail] = useState<any>();
  const [authUser, setAuthUser] = useState<SessionUser | null>(null);

  const hasCreatedUser = React.useRef(false);

  useEffect(() => {
    axios.get('/api/auth/me')
      .then(res => {
        if (res.data.user) {
          setAuthUser(res.data.user);
          if (!hasCreatedUser.current) {
            hasCreatedUser.current = true;
            axios.post('/api/user/', {})
              .then(r => setUserDetail(r.data))
              .catch(() => {});
          }
        }
      })
      .catch(() => setAuthUser(null));
  }, []);

  return (
    <NextThemesProvider {...props}>
      <UserDetailsContext.Provider value={{ userDetail, setUserDetail, authUser, setAuthUser }}>
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
