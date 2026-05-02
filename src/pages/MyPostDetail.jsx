import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import api from "../api/axiosInstance";

export default function MyPostDetail() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", id],
    queryFn: () => api.get(`/api/posts/${id}`).then((r) => r.data),
  });

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Post tapılmadı!</p>;

  return (
    <div>
      <Link to="/posts">← Geri qayıt</Link>
      <h2>{data?.post?.title}</h2>
      <p>{data?.post?.content}</p>
      <small>{new Date(data?.post?.createdAt).toLocaleDateString()}</small>
    </div>
  );
}