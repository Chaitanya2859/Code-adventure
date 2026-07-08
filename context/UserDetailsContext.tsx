import { createContext } from "react";
import { SessionUser } from "@/lib/auth";

interface UserDetailsContextType {
  userDetail: any;
  setUserDetail: (user: any) => void;
  authUser: SessionUser | null;
  setAuthUser: (user: SessionUser | null) => void;
}

export const UserDetailsContext = createContext<UserDetailsContextType>({
  userDetail: undefined,
  setUserDetail: () => {},
  authUser: null,
  setAuthUser: () => {},
});