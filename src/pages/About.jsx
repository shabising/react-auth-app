import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function About() {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.about,
    queryFn: () => api.get("/api/about").then((r) => r.data),
  });

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta baş verdi, yenidən cəhd edin.</p>;

  return (
    <div>
      <h1>Haqqında</h1>
      <p>{data?.message}</p>
    </div>
  );
}