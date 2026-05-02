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
    onError: () => {
      toast.error("Email və ya şifrə yanlışdır!");
    },
  });

  return (
    <div>
      <h2>Daxil ol</h2>
      <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            {...register("email")}
            placeholder="Email"
            type="email"
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Şifrə</label>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Şifrə"
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
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Giriş edilir..." : "Daxil ol"}
        </button>
      </form>
    </div>
  );
}