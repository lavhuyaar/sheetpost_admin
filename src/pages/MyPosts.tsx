import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../hooks/useAuth";

import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

import { IPost } from "../intefaces";

import Header from "../components/Header";
import Footer from "../components/Footer";
import PostSkeleton from "../components/skeletons/PostSkeleton";
import Post from "../components/Post";

const MyPosts = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<IPost[] | null>(null);
  const [postsCount, setPostsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  //Redirects to login page if user is not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate("/login?redirect=/posts");
    }
  }, [userInfo, navigate]);

  //Fetches all the posts of the logged in author
  const getAuthorPosts = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/posts/admin");
      const { posts, totalCount } = response.data;
      setPosts(posts);
      setPostsCount(totalCount);
    } catch (error) {
      handleAxiosError(error, "Failed to get all author posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAuthorPosts();
  }, []);

  return (
    <>
      <Header />

      <main className="p-6 gap-4 text-2xl font-semibold">
        <section className="posts grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 relative">
          {posts && postsCount !== null && !loading && (
            <>
              <h1 className="px-2 col-span-full">
                My Posts {postsCount !== null ? `(${postsCount})` : ""}
              </h1>
              {posts.length > 0 ? (
                posts.map((post) => <Post key={post?.id} {...post} />)
              ) : (
                <div className="h-[60vh] flex items-center justify-center text-center col-span-full">
                  No posts
                </div>
              )}
            </>
          )}
          {!loading && !posts && (
            <div className="h-[60vh] text-md flex items-center flex-col justify-center text-center col-span-full">
              <h3 className="text-[100px]">404</h3>
              <p className="text-sm">
                There occured some error! Try again later
              </p>
            </div>
          )}
          {loading && (
            <>
              <div className="animate-pulse h-8 w-full sm:w-1/5 ml-2 bg-surface col-span-full" />
              {Array.from({ length: 12 }).map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </>
          )}

          <NavLink
            to="/new-post"
            className="z-999 text-primary-txt font-semibold hover:text-black bottom-5 text-sm bg-primary cursor-pointer hover:bg-primary-hover transition right-5 fixed px-4 py-2 rounded-md"
          >
            Add new post
          </NavLink>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default MyPosts;
