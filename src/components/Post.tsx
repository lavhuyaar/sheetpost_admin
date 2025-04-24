import { MdDeleteOutline } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { IPost } from "../intefaces";
import formatDate from "../utils/formatDate";
import { useNavigate } from "react-router";

const Post: React.FC<IPost> = ({ title, id, content, createdAt }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/posts/${id}`);
  };

  return (
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
        <p className="text-sm">{formatDate(createdAt)}</p>
        <div className="flex items-center">
          <button
            title="Edit post"
            type="button"
            className="cursor-pointer hover:text-black hover:bg-primary-hover transition p-2 text-xl rounded-full"
          >
            <RiEditBoxLine />
          </button>
          <button
            title="Delete post"
            type="button"
            className="cursor-pointer hover:text-black hover:bg-primary-hover transition p-2 text-xl rounded-full"
          >
            <MdDeleteOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Post;
