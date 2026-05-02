import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
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
    mutationFn: (data) => api.post("/api/auth/login", data).then((r) => r.data),
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
    <div style={{ maxWidth: "420px", margin: "0 auto" }}>
      <div className="card">
        <h2 style={{ marginBottom: "24px", fontSize: "24px" }}>Daxil ol 👋</h2>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="email">E-poçt</label>
            <input id="email" {...register("email")} placeholder="nümunə@mail.com" type="email" />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="password">Şifrə</label>
            <div style={{ display: "flex", gap: "8px" }}>
              <input id="password" {...register("password")} type={showPassword ? "text" : "password"} placeholder="••••••••" style={{ flex: 1 }} />
              <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {errors.password && <p className="error-text">{errors.password.message}</p>}
          </div>
          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Giriş edilir..." : "Daxil ol"}
          </button>
        </form>
        <p style={{ marginTop: "16px", fontSize: "14px", color: "#824D69", textAlign: "center" }}>
          Hesabın yoxdur? <Link to="/register" style={{ color: "#522959", fontWeight: 500 }}>Qeydiyyat</Link>
        </p>
      </div>
    </div>
  );
}