import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosInstance from "../api/axiosInstance";
import handleAxiosError from "../utils/handleAxiosError";

const PostDetail = () => {
  const [postDetails, setPostDetails] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) {
      navigate("/posts", { replace: true });
      return;
    }

    const fetchPostDetails = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/posts/admin/${postId}`);
        setPostDetails(response.data?.post);
      } catch (error) {
        handleAxiosError(error, "Failed to fetch Post Details");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [postId, navigate]);

  return <div>PostDetail</div>;
};

export default PostDetail;
