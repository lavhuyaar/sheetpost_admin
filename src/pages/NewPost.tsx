import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";
import CustomInput from "../components/CustomInput";
import newPostSchema from "../validators/newPostSchema";
import { useNavigate } from "react-router";
import { IPostFormValues } from "../interfaces";

const NewPost = () => {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IPostFormValues>({ resolver: yupResolver(newPostSchema) });

  const onSubmit: SubmitHandler<IPostFormValues> = async (values) => {
    console.log(values);
    toast.loading("Creating new post...");
    setSubmitting(true);
    try {
      await axiosInstance.post("/posts/new", values);
      toast.dismiss();
      toast.success("Post created successfully!");
      navigate("/posts", { replace: true });
      reset();
    } catch (error) {
      handleAxiosError(error, "Failed to Sign up");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <Header />
      <main className="items-center py-10 px-6 sm:px-[5%] gap-3">
        <h1 className="text-[26px] text-start font-semibold">New post</h1>
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
            errorMessage={errors.title?.message}
          />

          <div className="flex flex-col gap-2">
            <label htmlFor="content" className="font-semibold">
              Main Content:
            </label>
            <textarea
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
              Do you want this post to be publically visible? (This can be
              changed later)
            </label>
            <select
              defaultValue="false"
              className="border-text-primary/10 w-full text-text-primary focus:outline-none align-middle border rounded-md px-3 py-2"
              {...register("isPublished", { required: true })}
              id="isPublished"
            >
              <option className="bg-surface px-3 py-2 rounded-md" value="true">
                Yes
              </option>
              <option className="bg-surface px-3 py-2 rounded-md" value="false">
                No
              </option>
            </select>

            <p className="text-red-500 text-sm w-full">
              {errors.isPublished?.message}
            </p>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="mt-2 primary-btn"
          >
            Create new post
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default NewPost;
