import { useState } from "react";
import { NavLink } from "react-router";
import { MdDeleteOutline } from "react-icons/md";

import { IComment } from "../interfaces";
import formatDate from "../utils/formatDate";

import DeleteModal from "./DeleteModal";

interface ICommentCardProps extends IComment {
  onDelete: (commentId: string) => void;
}

const CommentCard = (props: ICommentCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openDeleteModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="p-3 rounded-md flex flex-col w-full gap-4 bg-surface text-sm">
        <pre className="text-sm text-wrap">{props?.content}</pre>
        <div className="flex items-center justify-between gap-4">
          <p>
            Added by <span className="text-primary">{props?.user?.username}</span>
            on{" "}
            <NavLink
              target="_main"
              className="underline text-primary"
              to={`/posts/${props?.post?.id}`}
            >
              {props?.post?.title}
            </NavLink>
          </p>
          <div className="flex items-center gap-4">
            {formatDate(props?.createdAt)}
            <button
              onClick={openDeleteModal}
              title="Delete comment"
              type="button"
              className="cursor-pointer hover:text-black hover:bg-primary-hover transition p-2 text-xl rounded-full"
            >
              <MdDeleteOutline size={30} />
            </button>
          </div>
        </div>
      </div>

      <DeleteModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        deleteFunc={() => props.onDelete(props?.id)}
        warningMessage="Do you confirm to delete this comment?"
        disclaimer="(it cannot be restored later)"
      />
    </>
  );
};

export default CommentCard;
