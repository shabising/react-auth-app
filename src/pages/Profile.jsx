import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function Profile() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: () => api.get("/api/user/profile").then((r) => r.data),
  });

  return (
    <div className="card">
      <h2 style={{ fontSize: "24px", marginBottom: "24px" }}>Profile 👤</h2>
      {isLoading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div className="spinner" />
        </div>
      ) : (
        <div className="profile-info">
          <p><strong>Name:</strong> {data?.user?.name || "—"}</p>
          <p><strong>Email:</strong> {data?.user?.email || "—"}</p>
          <p><strong>ID:</strong> {data?.user?.id || "—"}</p>
        </div>
      )}
    </div>
  );
}