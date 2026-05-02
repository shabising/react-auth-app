import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { usePostStore } from "../store/postStore";
import toast from "react-hot-toast";

export default function Posts() {
  const user = useAuthStore((s) => s.user);
  const { getUserPosts, addPost, deletePost } = usePostStore();
  const posts = getUserPosts(user?.id);

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

      {posts.length === 0 && <p>Heç bir post yoxdur. Yeni post əlavə et!</p>}

      {posts.map((post) => (
        <div key={post.id} style={{ borderBottom: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
          <Link to={`/myposts/${post.id}`}>
            <h3>{post.title}</h3>
          </Link>
          <p>{post.content}</p>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <small>{new Date(post.createdAt).toLocaleDateString()}</small>
            <button
              onClick={() => {
                deletePost(post.id);
                toast.success("Post silindi!");
              }}
              style={{ color: "red" }}
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}