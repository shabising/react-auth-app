import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import api from "../api/axiosInstance";

export default function Posts() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: () => api.get("/api/posts/my-posts").then((r) => r.data),
  });

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta baş verdi!</p>;

  return (
    <div>
      <h2>Mənim Postlarım</h2>
      {data?.posts?.length === 0 && <p>Heç bir post yoxdur.</p>}
      {data?.posts?.map((post) => (
        <div key={post.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px" }}>
          <Link to={`/myposts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.content}</p>
          <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}