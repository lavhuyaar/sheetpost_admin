import { Route, Routes } from "react-router";

//Pages
import Home from "../pages/Home";
import PageNotFound from "../pages/PageNotFound";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import { ToastContainer } from "react-toastify";
import useTheme from "../hooks/useTheme";
import MyPosts from "../pages/MyPosts";
import NewPost from "../pages/NewPost";
import PostDetail from "../pages/PostDetail";
import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import Dashboard from "../pages/Dashboard";
import AllComments from "../pages/AllComments";
import ScrollToTop from "../components/ScrollToTop";

const AppRoutes = () => {
  const { theme } = useTheme();
  const { logoutUser, loginUser } = useAuth();

  //Logs in User automatically if there exists credentials in localStorage
  useEffect(() => {
    const credentials = JSON.parse(
      localStorage.getItem("userCredentials") || "null"
    );

    if (!credentials) {
      logoutUser();
    } else {
      loginUser(credentials);
    }
  }, []);

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="login" element={<Login />} />
        <Route path="posts" element={<MyPosts />} />
        <Route path="posts/:postId" element={<PostDetail />} />
        <Route path="new-post" element={<NewPost />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="comments" element={<AllComments />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer theme={theme} pauseOnHover={false} draggable={false} />
    </>
  );
};

export default AppRoutes;
