import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function Home() {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.home,
    queryFn: () => api.get("/api/home").then((r) => r.data),
  });

  return (
    <div>
      <div className="card" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Xoş gəlmisiniz! 👋</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.7" }}>
          {data?.message || "Bu React Authentication tətbiqidir."}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>🔐</p>
          <h3 style={{ margin: "12px 0 6px" }}>Təhlükəsiz Giriş</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>JWT token ilə qorunan autentifikasiya sistemi.</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>📝</p>
          <h3 style={{ margin: "12px 0 6px" }}>Post İdarəsi</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Öz postlarını yaz, oxu və idarə et.</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>👤</p>
          <h3 style={{ margin: "12px 0 6px" }}>Profil</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Şəxsi məlumatlarını idarə et.</p>
        </div>
      </div>
    </div>
  );
}