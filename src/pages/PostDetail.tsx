import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { RiEditBoxLine } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";

import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

import { IPost, IPostFormValues } from "../interfaces";

import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomInput from "../components/CustomInput";
import PostDetailSkeleton from "../components/skeletons/PostDetailSkeleton";
import DeleteModal from "../components/DeleteModal";

import newPostSchema from "../validators/newPostSchema";

const PostDetail = () => {
  const [postDetails, setPostDetails] = useState<IPost | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<
    { status?: number; message?: string } | undefined
  >(undefined);
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostFormValues>({ resolver: yupResolver(newPostSchema) });

  //Gets Post data
  const fetchPostDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/posts/admin/${postId}`);
      setPostDetails(response.data?.post);
    } catch (error) {
      handleAxiosError(error, "Failed to fetch Post Details", setError);
    } finally {
      setLoading(false);
    }
  };

  //Opens the page with editMode as default when navigated from Posts page (to edit post)
  useEffect(() => {
    const locationState = location.state?.isEdit;
    if (locationState) {
      setIsEditMode(locationState);
    } else setIsEditMode(false);
  }, [location]);

  //Navigates back to Posts page if there is no postId found
  useEffect(() => {
    if (!postId) {
      navigate("/posts", { replace: true });
      return;
    }
    fetchPostDetails();
  }, [postId]);

  //Edits post
  const onSubmit: SubmitHandler<IPostFormValues> = async (values) => {
    toast.loading("Editing post...");
    setSubmitting(true);
    try {
      await axiosInstance.put(`/posts/post/${postDetails?.id}`, values);
      toast.dismiss();
      toast.success("Post successfully edited!");
      setIsEditMode(false);
      window.scrollTo(0, 0);
      await fetchPostDetails(); //Fetches updated data
    } catch (error) {
      handleAxiosError(error, "Failed to edit post");
    } finally {
      setSubmitting(false);
    }
  };

  //Enables edit mode
  const toggleToEdit = () => {
    setIsEditMode(true);
    window.scrollTo(0, 0);
  };

  //Deletes post
  const handleOnDelete = async () => {
    toast.loading("Deleting post...");
    try {
      await axiosInstance.delete(`/posts/post/${postId}`);
      toast.dismiss();
      toast.success("Post deleted successfully!");
      navigate("/posts", { replace: true });
    } catch (error) {
      handleAxiosError(error, "Failed to delete post!");
    }
  };

  //Disables edit mode
  const cancelEdit = () => {
    setIsEditMode(false);
    reset();
  };

  //Closes Delete post Modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Opens Delete post Modal on Click of delete icon
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      <main className={`p-6 sm:px-[5%] items-center justify-center py-12`}>
        {!loading ? (
          <>
            {!error ? (
              <>
                <NavLink
                  replace={true}
                  className="self-start mb-2 flex items-center gap-2 hover:text-primary/80 transition"
                  to="/posts"
                >
                  <FaArrowLeft /> Go back to Posts
                </NavLink>
                {isEditMode ? (
                  <>
                    {/* Edit form */}
                    <h1 className="text-[26px] mb-3 text-start font-semibold">
                      Edit Post
                    </h1>
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex flex-col gap-3 bg-surface p-5 sm:p-8 w-full rounded-lg drop-shadow-[4px, 0px, 4px] drop-shadow-primary"
                    >
                      <CustomInput
                        register={register}
                        name="title"
                        placeholder="Title"
                        labelText="Title:"
                        type="text"
                        value={postDetails?.title}
                        errorMessage={errors.title?.message}
                      />

                      <div className="flex flex-col gap-2">
                        <label htmlFor="content" className="font-semibold">
                          Main Content:
                        </label>
                        <textarea
                          defaultValue={postDetails?.content}
                          placeholder="Main content..."
                          className="resize-none border-text-primary/10 !h-[400px] w-full focus:outline-none align-middle border rounded-md px-3 py-2"
                          id="content"
                          {...register("content", { required: true })}
                        />
                        <p className="text-red-500 text-sm w-full">
                          {errors.content?.message}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="isPublished" className="font-semibold">
                          Do you want this post to be publically visible? (This
                          can be changed later)
                        </label>
                        <select
                          defaultValue={String(postDetails?.isPublished)}
                          className="border-text-primary/10 w-full text-text-primary focus:outline-none align-middle border rounded-md px-3 py-2"
                          {...register("isPublished", { required: true })}
                          id="isPublished"
                        >
                          <option
                            className="bg-surface px-3 py-2 rounded-md"
                            value="true"
                          >
                            Yes
                          </option>
                          <option
                            className="bg-surface px-3 py-2 rounded-md"
                            value="false"
                          >
                            No
                          </option>
                        </select>

                        <p className="text-red-500 text-sm w-full">
                          {errors.isPublished?.message}
                        </p>
                      </div>
                      <div className="self-center sm:self-end flex items-center gap-4">
                        <button
                          type="button"
                          onClick={cancelEdit}
                          disabled={submitting}
                          className="mt-2 secondary-btn"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="mt-2 primary-btn"
                        >
                          Confirm
                        </button>
                      </div>
                    </form>
                  </>
                ) : (
                  // Post details
                  <div className="flex flex-col gap-3 bg-surface p-5 sm:p-8 w-full rounded-lg drop-shadow-[4px, 0px, 4px] drop-shadow-primary">
                    <h2 className="text-3xl break-words font-semibold focus:outline-none align-middle border-none rounded-md">
                      {postDetails?.title}
                    </h2>

                    <pre
                      role="textbox"
                      className="resize-none min-h-[50vh] text-wrap w-full focus:outline-none align-middle border-none rounded-md"
                    >
                      {postDetails?.content}
                    </pre>

                    <div className="self-center sm:self-end flex items-center gap-4">
                      {" "}
                      <button
                        onClick={openModal}
                        className="mt-2 primary-btn"
                        title="Delete post"
                      >
                        <MdDeleteOutline className="size-[24px]" />
                      </button>
                      <button
                        onClick={toggleToEdit}
                        className="mt-2 primary-btn"
                      >
                        <RiEditBoxLine
                          className="size-[24px]"
                          title="Edit post"
                        />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              // Error
              <>
                <h2 className="text-[4rem] sm:text-[8rem] font-bold text-center col-span-full">
                  {error?.status}
                </h2>
                <p className="text-center relative bottom-4 text-2xl col-span-full">
                  {error?.message || "Internal Error"}
                </p>
                <NavLink
                  to="/posts"
                  replace
                  className="mt-2 text-md font-semibold cursor-pointer text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
                >
                  Go back to Posts
                </NavLink>
              </>
            )}
          </>
        ) : (
          // Skeleton (in loading state)
          <PostDetailSkeleton />
        )}
      </main>
      <Footer />

      <DeleteModal
        deletePost={handleOnDelete}
        closeModal={closeModal}
        isModalOpen={isModalOpen}
        warningMessage="Do you confirm to delete this post?"
        disclaimer="(it cannot be restored later, all the related comments will be deleted)"
      />
    </>
  );
};

export default PostDetail;
