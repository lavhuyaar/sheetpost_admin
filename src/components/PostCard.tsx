import React, { useState } from "react";
import { useNavigate } from "react-router";

import { MdDeleteOutline } from "react-icons/md";
import { RiEditBoxLine, RiGlobalLine } from "react-icons/ri";
import { IoMdLock } from "react-icons/io";

import formatDate from "../utils/formatDate";

import { IPost } from "../interfaces";

import DeleteModal from "./DeleteModal";

interface PostProps extends IPost {
  onDelete: (postId: string) => Promise<void>;
}

const PostCard: React.FC<PostProps> = ({
  title,
  id,
  content,
  createdAt,
  isPublished,
  onDelete,
}) => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOnClick = () => {
    navigate(`/posts/${id}`);
  };

  //Redirect to Post Detail component with route state -> true
  const handleEdit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    navigate(`/posts/${id}`, {
      state: {
        isEdit: true,
      },
    });
  };

  const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        key={id}
        onClick={handleOnClick}
        className="bg-surface flex flex-col gap-2 px-5 py-4 rounded-md sm:hover:scale-110 transition-hover drop-shadow-[1px_1px_2px] drop-shadow-text-primary/20 hover:z-50 duration-300 ease-in-out cursor-pointer"
      >
        <h3
          title={title}
          className="min-h-4 text-xl font-semibold w-full whitespace-nowrap overflow-ellipsis overflow-hidden"
        >
          {title}
        </h3>
        <p className="h-28 text-xs w-full whitespace-break-spaces text-wrap overflow-ellipsis overflow-hidden">
          {content}
        </p>

        <div className="h-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm">{formatDate(createdAt)}</p>
            <span className="text-[20px]">
              {" "}
              {isPublished === false ? (
                <IoMdLock title="Private" />
              ) : (
                <RiGlobalLine title="Public" />
              )}
            </span>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleEdit}
              title="Edit post"
              type="button"
              className="cursor-pointer hover:text-black hover:bg-primary-hover transition p-2 text-xl rounded-full"
            >
              <RiEditBoxLine />
            </button>
            <button
              onClick={openDeleteModal}
              title="Delete post"
              type="button"
              className="cursor-pointer hover:text-black hover:bg-primary-hover transition p-2 text-xl rounded-full"
            >
              <MdDeleteOutline />
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        deletePost={() => onDelete(id)}
        warningMessage="Do you confirm to delete this post?"
        disclaimer="(it cannot be restored later, all the related comments will be deleted)"
      />
    </>
  );
};

export default PostCard;
