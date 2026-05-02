import { Link } from "react-router-dom";

export default function AuthError() {
  return (
    <div className="not-found">
      <h1 style={{ fontSize: "48px" }}>🔐</h1>
      <h2 style={{ marginTop: "16px" }}>Giriş tələb olunur</h2>
      <p style={{ color: "#824D69", margin: "12px 0 24px" }}>
        Bu səhifəyə baxmaq üçün hesabınıza daxil olmalısınız.
      </p>
      <Link to="/login" className="btn-primary" style={{ display: "inline-block" }}>
        Daxil ol
      </Link>
    </div>
  );
}