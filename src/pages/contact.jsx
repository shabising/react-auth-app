import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function Contact() {
  const { data } = useQuery({
    queryKey: QUERY_KEYS.contact,
    queryFn: () => api.get("/api/contact").then((r) => r.data),
  });

  return (
    <div>
      <div className="card" style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "8px" }}>Əlaqə 📬</h1>
        <p style={{ color: "#666", fontSize: "16px", lineHeight: "1.7" }}>
          {data?.message || "Bizimlə əlaqə saxlamaqdan çəkinməyin!"}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>📧</p>
          <h3 style={{ margin: "12px 0 6px" }}>E-poçt</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>support@devlab.com</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>💬</p>
          <h3 style={{ margin: "12px 0 6px" }}>Canlı Dəstək</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Həftə içi 09:00 - 18:00</p>
        </div>
        <div className="card" style={{ textAlign: "center" }}>
          <p style={{ fontSize: "32px" }}>📍</p>
          <h3 style={{ margin: "12px 0 6px" }}>Ünvan</h3>
          <p style={{ color: "#888", fontSize: "14px" }}>Bakı, Azərbaycan</p>
        </div>
      </div>
    </div>
  );
}