import { useParams, Link, useNavigate } from "react-router-dom";
import { usePostStore } from "../store/postStore";
import toast from "react-hot-toast";

export default function MyPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, deletePost } = usePostStore();
  const post = getPostById(id);

  if (!post) return (
    <div>
      <p>Post tapılmadı!</p>
      <Link to="/posts">← Geri qayıt</Link>
    </div>
  );

  const handleDelete = () => {
    deletePost(id);
    toast.success("Post silindi!");
    navigate("/posts");
  };

  return (
    <div>
      <Link to="/posts">← Geri qayıt</Link>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>{new Date(post.createdAt).toLocaleDateString()}</small>
      <br />
      <button
        onClick={handleDelete}
        style={{ color: "red", marginTop: "16px" }}
      >
        Postu sil
      </button>
    </div>
  );
}