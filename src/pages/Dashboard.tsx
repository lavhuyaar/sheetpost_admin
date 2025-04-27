import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { MdOutlineComment, MdOutlineNewLabel } from "react-icons/md";
import { PiReadCvLogoBold } from "react-icons/pi";

import useAuth from "../hooks/useAuth";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Dashboard = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/dashboard");
    }
  }, [userInfo, navigate]);

  return (
    <>
      <Header />
      <main className="items-center justify-center gap-10 p-6 sm:px-[5%]">
        <h1 className="font-semibold text-4xl text-center">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 justify-center md:grid-cols-3 w-full gap-4">
          <NavLink
            to="/posts"
            className="w-full bg-surface rounded-md p-4 min-h-[300px] flex items-center justify-center text-2xl sm:hover:scale-110 transition-hover drop-shadow-[1px_1px_2px] drop-shadow-text-primary/20 hover:z-50 duration-300 ease-in-out cursor-pointer flex-col text-center"
          >
            <PiReadCvLogoBold className="size-[40px]" />
            <h2>My Posts</h2>
          </NavLink>
          <NavLink
            to="/comments"
            className="w-full bg-surface rounded-md p-4 min-h-[300px] flex items-center justify-center text-2xl sm:hover:scale-110 transition-hover drop-shadow-[1px_1px_2px] drop-shadow-text-primary/20 hover:z-50 duration-300 ease-in-out cursor-pointer flex-col text-center"
          >
            <MdOutlineComment className="size-[40px]" />
            <h2>All Comments</h2>
          </NavLink>
          <NavLink
            to="/new-post"
            className="w-full sm:col-span-full md:col-span-1 bg-surface rounded-md p-4 min-h-[300px] flex items-center justify-center text-2xl sm:hover:scale-110 transition-hover drop-shadow-[1px_1px_2px] drop-shadow-text-primary/20 hover:z-50 duration-300 ease-in-out cursor-pointer flex-col text-center"
          >
            <MdOutlineNewLabel className="size-[40px]" />
            <h2>Create New Post</h2>
          </NavLink>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Dashboard;
