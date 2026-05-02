import { useParams, Link, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import toast from "react-hot-toast";

export default function MyPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, deletePost } = usePostStore();
  const post = getPostById(id);

  if (!post) return (
    <div className="card" style={{ textAlign: "center", padding: "48px 20px" }}>
      <p style={{ fontSize: "40px" }}>📭</p>
      <h3 style={{ margin: "16px 0 8px" }}>Post tapılmadı</h3>
      <Link to="/posts" className="btn-primary" style={{ display: "inline-block", marginTop: "8px" }}>
        ← Geri qayıt
      </Link>
    </div>
  );

  const handleDelete = () => {
    deletePost(id);
    toast.success("Post silindi!");
    navigate("/posts");
  };

  return (
    <div className="card">
      <Link to="/posts" style={{ color: "#824D69", fontSize: "14px", textDecoration: "none" }}>
        ← Geri qayıt
      </Link>
      <h2 style={{ margin: "16px 0 12px", fontSize: "24px" }}>{post.title}</h2>
      <p style={{ color: "#522959", lineHeight: "1.7", marginBottom: "16px" }}>{post.content}</p>
      <small style={{ color: "#824D69" }}>{new Date(post.createdAt).toLocaleDateString("az-AZ")}</small>
      <br />
      <button className="delete-btn" onClick={handleDelete} style={{ marginTop: "20px" }}>
        Postu sil
      </button>
    </div>
  );
}