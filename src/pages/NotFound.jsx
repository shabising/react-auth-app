import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>Axtardığın səhifə tapılmadı.</p>
      <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: "8px" }}>
        Ana səhifəyə qayıt
      </Link>
    </div>
  );
}