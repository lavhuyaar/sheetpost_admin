import { createContext, ReactNode, useState } from "react";
import { IUser } from "../interfaces";
import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

interface IAuth {
  userInfo: IUser | null;
  loginUser: (credentials: {
    email: string;
    password: string;
  }) => Promise<void>;
  logoutUser: () => void;
}

const AuthContext = createContext<IAuth | null>(null);

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const navigate = useNavigate();

  const loginUser = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      const response = await axiosInstance.post("/loginAdmin", credentials);
      const { author, token } = response.data;
      setUserInfo(author);
      const searchParams = new URLSearchParams(location.search);
      const goToPath = searchParams.get("redirect");
      navigate(goToPath || location.pathname, { replace: true });

      //Stores credentials and authToken in localStorage
      localStorage.setItem("userCredentials", JSON.stringify(credentials));
      localStorage.setItem("authToken", token);
    } catch (error) {
      handleAxiosError(error, "Failed to login author!");
      setUserInfo(null);
    }
  };

  const logoutUser = () => {
    setUserInfo(null); //Removes userInfo

    //Clears localStorage
    localStorage.removeItem("userCredentials");
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
