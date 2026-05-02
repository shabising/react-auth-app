import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function About() {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.about,
    queryFn: () => api.get("/api/about").then((r) => r.data),
  });

  return (
    <div>
      <div className="card" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Haqqımızda 🏢</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.7" }}>
          {data?.message || "Bu layihə React və Node.js ilə hazırlanmış tam autentifikasiya sistemidir."}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>⚛️</p>
          <h3 style={{ margin: "12px 0 6px" }}>React 19</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Müasir frontend texnologiyası ilə hazırlanıb.</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>🛡️</p>
          <h3 style={{ margin: "12px 0 6px" }}>JWT Auth</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Təhlükəsiz token əsaslı autentifikasiya.</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>🚀</p>
          <h3 style={{ margin: "12px 0 6px" }}>Express.js</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Güclü REST API backend ilə işləyir.</p>
        </div>
      </div>
    </div>
  );
}