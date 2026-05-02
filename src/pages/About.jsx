export default function About() {
  return (
    <div>
      <div className="card" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>About Us 🏢</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.7" }}>
          This project is a full authentication system built with React and Node.js.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>⚛️</p>
          <h3 style={{ margin: "12px 0 6px" }}>React 19</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Built with the latest modern frontend technology.</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>🛡️</p>
          <h3 style={{ margin: "12px 0 6px" }}>JWT Auth</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Secure token-based authentication system.</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>🚀</p>
          <h3 style={{ margin: "12px 0 6px" }}>Express.js</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Powered by a robust REST API backend.</p>
        </div>
      </div>
    </div>
  );
}