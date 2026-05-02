import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function Home() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: QUERY_KEYS.home,
    queryFn: () => api.get("/api/home").then((r) => r.data),
  });

  if (isLoading) return (
    <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
      <div className="spinner" />
      <p style={{ marginTop: "16px", color: "#888" }}>Yüklənir...</p>
    </div>
  );

  if (isError) return (
    <div className="card" style={{ textAlign: "center", padding: "60px 20px" }}>
      <p style={{ fontSize: "40px" }}>⚠️</p>
      <h2 style={{ marginTop: "12px", marginBottom: "8px" }}>Xəta baş verdi</h2>
      <p style={{ color: "#888", marginBottom: "24px" }}>Server cavab vermir, bir az gözləyib yenidən cəhd edin.</p>
      <button className="btn-primary" onClick={() => refetch()}>Yenidən cəhd et</button>
    </div>
  );

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