import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Səhifə tapılmadı</h1>
      <p>Belə bir route mövcud deyilsə göstərilir.</p>
      <Link to="/">Ana səhifəyə qayıt</Link>
    </div>
  );
}