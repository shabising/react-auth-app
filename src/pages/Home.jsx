export default function Home() {
  return (
    <div>
      <div className="card" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Welcome! 👋</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.7" }}>
          This is a React Authentication application.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>🔐</p>
          <h3 style={{ margin: "12px 0 6px" }}>Secure Login</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Authentication system protected with JWT tokens.</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>📝</p>
          <h3 style={{ margin: "12px 0 6px" }}>Post Management</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Write, read and manage your own posts.</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>👤</p>
          <h3 style={{ margin: "12px 0 6px" }}>Profile</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Manage your personal information.</p>
        </div>
      </div>
    </div>
  );
}