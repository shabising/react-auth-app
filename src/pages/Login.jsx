import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../api/axiosInstance";

const schema = z.object({
  email: z.string().email("Düzgün email daxil et"),
  password: z.string().min(6, "Minimum 6 simvol"),
});

export default function Login() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      api.post("/api/auth/login", data).then((r) => r.data),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
      navigate("/profile");
    },
  });

  return (
    <div>
      <h2>Daxil ol</h2>
      <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
        <div>
          <input {...register("email")} placeholder="Email" />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>
        <div>
          <input {...register("password")} type="password" placeholder="Şifrə" />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Giriş edilir..." : "Daxil ol"}
        </button>
        {mutation.isError && <p style={{ color: "red" }}>Xəta baş verdi!</p>}
      </form>
    </div>
  );
}