import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function Home() {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.home,
    queryFn: () => api.get("/api/home").then((r) => r.data),
  });

  if (isLoading) return <p>Yüklənir...</p>;

  return (
    <div>
      <h1>Ana Səhifə</h1>
      <p>{data?.message}</p>
    </div>
  );
}