import { Link } from "react-router-dom";

export default function AuthError() {
  return (
    <div>
      <h1>Giriş tələb olunur!</h1>
      <p>Bu səhifəyə daxil olmaq üçün login olmalısınız.</p>
      <Link to="/login">Login səhifəsinə get</Link>
    </div>
  );
}