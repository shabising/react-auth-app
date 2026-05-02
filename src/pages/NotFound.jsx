import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>The page you are looking for was not found.</p>
      <Link to="/" className="btn-primary" style={{ display: "inline-block", marginTop: "8px" }}>
        Back to Home
      </Link>
    </div>
  );
}