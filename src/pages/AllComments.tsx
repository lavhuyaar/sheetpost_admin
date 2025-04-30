import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import useAuth from "../hooks/useAuth";

import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

import { IComment } from "../interfaces";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CommentCard from "../components/CommentCard";
import CommentSkeleton from "../components/skeletons/CommentSkeleton";
import Pagination from "../components/Pagination";

const COMMENTS_LIMIT: number = 6;

const AllComments = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [comments, setComments] = useState<IComment[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<
    { status?: number; message?: string } | undefined
  >(undefined);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  //Fetches all comments made on the posts created by Author
  const getAuthorComments = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/comments/admin/all?limit=${COMMENTS_LIMIT}&page=${currentPage}`
      );
      const { totalCount, comments } = response.data;
      setComments(comments);
      setTotalCount(totalCount);
    } catch (error) {
      handleAxiosError(error, "Failed to fetch comments", setError);
    } finally {
      setLoading(false);
    }
  };

  //If Author is not logged in, redirect to Login page
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/comments");
    }
  }, [userInfo, navigate]);

  //Re-fetches data after current page is changed
  useEffect(() => {
    if (!currentPage) return;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    getAuthorComments();
  }, [currentPage]);

  //Deletes comment
  const handleDelete = async (commentId: string) => {
    toast.loading("Deleting comment...");
    try {
      await axiosInstance.delete(`/comments/admin/${commentId}`);
      toast.dismiss();
      toast.success("Comment deleted successfully!");
      await getAuthorComments();
    } catch (error) {
      handleAxiosError(error, "Failed to delete comment!");
    }
  };

  return (
    <>
      <Header />

      <main
        className={`${
          error ? "justify-center" : ""
        } p-6 my-4 gap-4 text-2xl font-semibold`}
      >
        <div
          className={`${
            error ? "self-center justify-self-center" : ""
          } relative h-full gap-3 flex flex-col`}
        >
          {!loading ? (
            <>
              {!error ? (
                <>
                  <h1 className="px-2 my-4">
                    All Comments {totalCount !== null ? `(${totalCount})` : ""}
                  </h1>
                  {comments && comments.length > 0 ? (
                    <>
                      {comments.map((comment) => (
                        <CommentCard
                          key={comment?.id}
                          {...comment}
                          onDelete={handleDelete}
                        />
                      ))}
                      <Pagination
                        className="col-span-full mt-4"
                        limit={COMMENTS_LIMIT}
                        currentPage={currentPage}
                        totalDataLength={totalCount as number}
                        setCurrentPage={setCurrentPage}
                      />
                    </>
                  ) : (
                    <div className="h-[60vh] flex items-center justify-center text-center">
                      No posts
                    </div>
                  )}
                </>
              ) : (
                // Error
                <>
                  <h2 className="text-[4rem] sm:text-[8rem] font-bold text-center">
                    {error?.status}
                  </h2>
                  <p className="text-center relative bottom-4 text-2xl">
                    {error?.message}
                  </p>
                </>
              )}
            </>
          ) : (
            // Skeleton posts
            <>
              <div className="animate-pulse h-8 w-4/5 sm:w-1/5 ml-2 bg-surface" />
              {Array.from({ length: COMMENTS_LIMIT }).map((_, i) => (
                <CommentSkeleton key={i} />
              ))}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default AllComments;
