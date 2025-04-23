import { createContext, ReactNode, useState } from "react";
import { IUser } from "../types/interfaces";


const AuthContext = createContext<IUser | null>(null);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<string | null>(null); //Change later

  const loginUser = (info: string) => setUserInfo(info);

  const logoutUser = () => setUserInfo(null);

  return (
    <AuthContext.Provider value={{ userInfo, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
