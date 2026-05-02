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
      toast.error("Title and content cannot be empty!");
      return;
    }
    addPost(title, content, user?.id);
    toast.success("Post added successfully!");
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h2 style={{ fontSize: "24px" }}>My Posts 📝</h2>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="title">Title</label>
            <input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter title" />
          </div>
          <div style={{ marginBottom: "12px" }}>
            <label htmlFor="content">Content</label>
            <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Enter content" rows={4} />
          </div>
          <button type="submit">Publish</button>
        </form>
      )}

      {allPosts.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "48px 20px" }}>
          <p style={{ fontSize: "40px" }}>📭</p>
          <h3 style={{ margin: "16px 0 8px" }}>No posts yet</h3>
          <p style={{ color: "#888", marginBottom: "20px" }}>Add your first post!</p>
          <button className="btn-primary" onClick={() => setShowForm(true)}>+ New Post</button>
        </div>
      ) : (
        allPosts.map((post) => (
          <div key={post.id} className="post-card">
            <h3><Link to={`/myposts/${post.id}`}>{post.title}</Link></h3>
            <p>{post.content}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
              <small>{new Date(post.createdAt).toLocaleDateString("en-US")}</small>
              {localPosts.find((p) => p.id === post.id) && (
                <button className="delete-btn" onClick={() => { deletePost(post.id); toast.success("Post deleted!"); }}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}