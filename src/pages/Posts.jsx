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

  const { data } = useQuery({
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

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px" }}>Mənim Postlarım 📝</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "İmtina et" : "+ Yeni Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="title">Başlıq</label>
            <input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Başlıq daxil et"
            />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="content">Məzmun</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Məzmun daxil et"
              rows={4}
            />
          </div>
          <button type="submit">Paylaş</button>
        </form>
      )}

      {allPosts.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "48px 20px" }}>
          <p style={{ fontSize: "40px" }}>📭</p>
          <h3 style={{ margin: "16px 0 8px", color: "#1a1a2e" }}>Hələ heç bir post yoxdur</h3>
          <p style={{ color: "#888", marginBottom: "20px" }}>İlk postunu əlavə et!</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>+ Yeni Post</button>
        </div>
      ) : (
        allPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h3><Link to={`/myposts/${post.id}`}>{post.title}</Link></h3>
            <p>{post.content}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
              <small>{new Date(post.createdAt).toLocaleDateString("az-AZ")}</small>
              {localPosts.find((p) => p.id === post.id) && (
                <button
                  className="delete-btn"
                  onClick={() => {
                    deletePost(post.id);
                    toast.success("Post silindi!");
                  }}
                >
                  Sil
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}