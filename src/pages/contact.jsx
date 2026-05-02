export default function Contact() {
  return (
    <div>
      <div className="card" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Contact Us 📬</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.7" }}>
          Feel free to reach out to us anytime!
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>📧</p>
          <h3 style={{ margin: "12px 0 6px" }}>Email</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>support@devlab.com</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>💬</p>
          <h3 style={{ margin: "12px 0 6px" }}>Live Support</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Weekdays 09:00 - 18:00</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>📍</p>
          <h3 style={{ margin: "12px 0 6px" }}>Address</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Baku, Azerbaijan</p>
        </div>
      </div>
    </div>
  );
}