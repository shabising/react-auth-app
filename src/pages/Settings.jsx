import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../store/authStore";
import api from "../api/axiosInstance";

const schema = z.object({
  name: z.string().min(2, "Ad minimum 2 simvol olmalıdır"),
});

export default function Settings() {
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || "",
    },
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      api.put("/api/user/settings", data).then((r) => r.data),

    // ✅ Optimistic Update
    onMutate: async (newData) => {
      await queryClient.cancelQueries(["profile"]);
      const prev = queryClient.getQueryData(["profile"]);
      queryClient.setQueryData(["profile"], (old) => ({
        ...old,
        user: { ...old?.user, ...newData },
      }));
      return { prev };
    },
    onError: (err, newData, context) => {
      queryClient.setQueryData(["profile"], context.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["profile"]);
    },
  });

  return (
    <div>
      <h2>Tənzimləmələr</h2>
      <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
        <div>
          <input {...register("name")} placeholder="Yeni ad" />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saxlanılır..." : "Yadda saxla"}
        </button>
        {mutation.isSuccess && <p style={{ color: "green" }}>Uğurla yeniləndi! ✅</p>}
        {mutation.isError && <p style={{ color: "red" }}>Xəta baş verdi!</p>}
      </form>
    </div>
  );
}