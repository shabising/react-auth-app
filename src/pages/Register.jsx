import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
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
    onError: () => {
      toast.error("Qeydiyyat zamanı xəta baş verdi!");
    },
  });

  return (
    <div>
      <h2>Qeydiyyat</h2>
      <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
        <div>
          <label htmlFor="name">Ad Soyad</label>
          <input
            id="name"
            {...register("name")}
            placeholder="Ad Soyad"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
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
          {mutation.isPending ? "Göndərilir..." : "Qeydiyyat"}
        </button>
      </form>
    </div>
  );
}