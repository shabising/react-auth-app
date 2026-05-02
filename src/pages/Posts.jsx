import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { usePostStore } from "../store/postStore";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function Posts() {
  const user = useAuthStore((s) => s.user);
  const { getUserPosts, addPost, deletePost } = usePostStore();
  const localPosts = getUserPosts(user?.id);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.posts,
    queryFn: () => api.get("/api/posts/my-posts").then((r) => r.data),
  });

  const apiPosts = data?.posts || [];
  const allPosts = [...localPosts, ...apiPosts];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Başlıq və məzmun boş ola bilməz!");
      return;
    }
    addPost(title, content, user?.id);
    toast.success("Post uğurla əlavə edildi!");
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta baş verdi, yenidən cəhd edin.</p>;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>Mənim Postlarım</h2>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "İmtina et" : "+ Yeni Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "16px", border: "1px solid #ccc" }}>
          <div>
            <label htmlFor="title">Başlıq</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Başlıq daxil et"
              style={{ display: "block", width: "100%", marginBottom: "8px" }}
            />
          </div>
          <div>
            <label htmlFor="content">Məzmun</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Məzmun daxil et"
              rows={4}
              style={{ display: "block", width: "100%", marginBottom: "8px" }}
            />
          </div>
          <button type="submit">Paylaş</button>
        </form>
      )}

      {allPosts.length === 0 && <p>Heç bir post yoxdur. Yeni post əlavə et!</p>}

      {allPosts.map((post) => (
        <div key={post.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <Link to={`/myposts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.content}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            {localPosts.find((p) => p.id === post.id) && (
              <button
                onClick={() => {
                  deletePost(post.id);
                  toast.success("Post silindi!");
                }}
                style={{ color: "red" }}
              >
                Sil
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}