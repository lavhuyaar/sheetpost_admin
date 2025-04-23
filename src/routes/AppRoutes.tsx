import { BrowserRouter, Route, Routes } from "react-router";

//Pages
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import { ToastContainer } from "react-toastify";
import useTheme from "../hooks/useTheme";

const AppRoutes = () => {

  const {theme} = useTheme();
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
    <ToastContainer
          theme={theme}
          pauseOnHover={false}
          draggable={false}
        />
    </>
  );
};

export default AppRoutes;
