import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

import axiosInstance from "../api/axiosInstance";

import Header from "../components/Header";
import Footer from "../components/Footer";

const AllComments = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  // const [comments, setComments] = useState<any | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<{
  //   status?: number;
  //   message?: string;
  // } | null>(null);
  // const [totalCount, setTotalCount] = useState<number | null>(null);

  const getAuthorComments = async () => {
    const response = await axiosInstance.get("/comments/admin/all");
    console.log(response.data);
  };

  //If Author is not logged in, redirect to Login page
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/comments");
    } else getAuthorComments();
  }, [userInfo, navigate]);

  return (
    <>
      <Header />
      <main className="items-center justify-center p-6 sm:px-[5%]">
        <h1>All Comments</h1>
      </main>
      <Footer />
    </>
  );
};

export default AllComments;
