import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(2, "Ad minimum 2 simvol olmalıdır"),
  email: z.string().email("Düzgün email daxil et"),
  password: z.string().min(6, "Şifrə minimum 6 simvol olmalıdır"),
});

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/api/auth/register", data).then((r) => r.data),
    onSuccess: () => {
      toast.success("Qeydiyyat uğurla tamamlandı!");
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Qeydiyyat zamanı xəta baş verdi!");
    },
  });

  return (
    <div style={{ maxWidth: "420px", margin: "0 auto" }}>
      <div className="card">
        <h2 style={{ marginBottom: "24px", fontSize: "24px" }}>Qeydiyyat 📝</h2>
        <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
          <div style={{ marginBottom: "16px" }}>
            <label htmlFor="name">Ad Soyad</label>
            <input id="name" {...register("name")} placeholder="Ad Soyad" />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </div>
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
            {mutation.isPending ? "Göndərilir..." : "Qeydiyyat"}
          </button>
        </form>
        <p style={{ marginTop: "16px", fontSize: "14px", color: "#824D69", textAlign: "center" }}>
          Hesabın var? <Link to="/login" style={{ color: "#522959", fontWeight: 500 }}>Daxil ol</Link>
        </p>
      </div>
    </div>
  );
}