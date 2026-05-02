import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const schema = z.object({
  name: z.string().min(2, "Ad minimum 2 simvol olmalıdır"),
  email: z.string().email("Düzgün email daxil et"),
  password: z.string().min(6, "Şifrə minimum 6 simvol olmalıdır"),
});

export default function Register() {
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: (data) => api.post("/api/auth/register", data).then((r) => r.data),
    onSuccess: () => navigate("/login"),
  });

  return (
    <div>
      <h2>Qeydiyyat</h2>
      <form onSubmit={handleSubmit((d) => mutation.mutate(d))}>
        <div>
          <input {...register("name")} placeholder="Ad Soyad" />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div>
          <input {...register("email")} placeholder="Email" />
          {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
        </div>
        <div>
          <input {...register("password")} type="password" placeholder="Şifrə" />
          {errors.password && <p style={{ color: "red" }}>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Göndərilir..." : "Qeydiyyat"}
        </button>
        {mutation.isError && <p style={{ color: "red" }}>Xəta baş verdi!</p>}
      </form>
    </div>
  );
}