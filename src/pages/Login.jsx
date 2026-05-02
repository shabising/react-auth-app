import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().email("Düzgün email daxil et"),
  password: z.string().min(6, "Minimum 6 simvol"),
});

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data) =>
      api.post("/api/auth/login", data).then((r) => r.data),
    onSuccess: (data) => {
      login(data.user, data.token);
      toast.success("Uğurla daxil oldunuz!");
      navigate("/profile");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Email və ya şifrə yanlışdır!");
    },
  });

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h2>Daxil ol</h2>
      <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email")}
            placeholder="Email"
            type="email"
            style={{ display: "block", width: "100%", padding: "8px", marginTop: "4px" }}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>
        <div style={{ marginBottom: "12px" }}>
          <label htmlFor="password">Şifrə</label>
          <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
            <input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Şifrə"
              style={{ flex: 1, padding: "8px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Şifrəni göstər/gizlət"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={mutation.isPending} style={{ width: "100%", padding: "8px" }}>
          {mutation.isPending ? "Giriş edilir..." : "Daxil ol"}
        </button>
      </form>
    </div>
  );
}