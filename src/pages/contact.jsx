import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";

export default function Contact() {
  const { data, isLoading, isError } = useQuery({
    queryKey: QUERY_KEYS.contact,
    queryFn: () => api.get("/api/contact").then((r) => r.data),
  });

  if (isLoading) return <p>Yüklənir...</p>;
  if (isError) return <p>Xəta baş verdi, yenidən cəhd edin.</p>;

  return (
    <div>
      <h1>Əlaqə</h1>
      <p>{data?.message}</p>
    </div>
  );
}