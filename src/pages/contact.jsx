import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export default function Contact() {
  const { data, isLoading } = useQuery({
    queryKey: ["contact"],
    queryFn: () => api.get("/api/contact").then((r) => r.data),
  });

  if (isLoading) return <p>Yüklənir...</p>;

  return (
    <div>
      <h1>Əlaqə</h1>
      <p>{data?.message}</p>
    </div>
  );
}