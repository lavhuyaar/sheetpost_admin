import { createContext, ReactNode, useState } from "react";
import { IUser } from "../intefaces";
import { toast } from "react-toastify";

interface IAuth {
  userInfo: IUser | null;
  loginUser: (info: IUser, token: string) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const localUser = JSON.parse(localStorage.getItem("userInfo") || "null");
  const [userInfo, setUserInfo] = useState<IUser | null>(localUser);

  const loginUser = (info: IUser, token: string) => {
    setUserInfo(info);

    //Stores credentials and authToken in localStorage
    localStorage.setItem("userInfo", JSON.stringify(info));
    localStorage.setItem("authToken", token);
  };

  const logoutUser = () => {
    setUserInfo(null); //Removes userInfo

    //Clears localStorage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("authToken");
    toast.success("Author logged out sucessfully!");
  };

  return (
    <AuthContext.Provider value={{ userInfo, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
