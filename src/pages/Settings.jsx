import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import { QUERY_KEYS } from "../hooks/useQueryKeys";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(2, "Ad minimum 2 simvol olmalıdır"),
});

export default function Settings() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { name: user?.name || "" },
  });

  const mutation = useMutation({
    mutationFn: (data) => api.put("/api/user/settings", data).then((r) => r.data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries(QUERY_KEYS.profile);
      const prev = queryClient.getQueryData(QUERY_KEYS.profile);
      queryClient.setQueryData(QUERY_KEYS.profile, (old) => ({
        ...old,
        user: { ...old?.user, ...newData },
      }));
      return { prev };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(QUERY_KEYS.profile, context.prev);
      toast.error(err?.response?.data?.message || "Xəta baş verdi!");
    },
    onSettled: () => {
      queryClient.invalidateQueries(QUERY_KEYS.profile);
    },
    onSuccess: () => {
      toast.success("Tənzimləmələr yeniləndi! ✅");
    },
  });

  return (
    <div style={{ maxWidth: "420px", margin: "0 auto" }}>
      <div className="card">
        <h2 style={{ fontSize: "24px", marginBottom: "24px" }}>Tənzimləmələr ⚙️</h2>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="name">Yeni ad</label>
            <input id="name" {...register("name")} placeholder="Adınızı daxil edin" />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Saxlanılır..." : "Yadda saxla"}
          </button>
        </form>
      </div>
    </div>
  );
}