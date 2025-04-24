const PostSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="h-6 animate-pulse w-full bg-surface" />
      <div className="h-28 animate-pulse w-full bg-surface" />
      <div className="h-6 animate-pulse w-full flex gap-3">
        <div className="animate-pulse h-full w-full bg-surface" />
        <div className="animate-pulse w-[50px] h-full bg-surface"></div>
        <div className="animate-pulse w-[50px] h-full bg-surface"></div>
      </div>
    </div>
  );
};

export default PostSkeleton;
