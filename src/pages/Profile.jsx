import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function Profile() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: () => api.get("/api/user/profile").then((r) => r.data),
  });

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>{error?.response?.data?.message || "Xəta baş verdi, yenidən cəhd edin."}</p>;

  return (
    <div>
      <h2>Profil</h2>
      <p><strong>Ad:</strong> {data?.user?.name}</p>
      <p><strong>Email:</strong> {data?.user?.email}</p>
      <p><strong>ID:</strong> {data?.user?.id}</p>
    </div>
  );
}