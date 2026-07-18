import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from || "/list-your-property";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await login(form.email, form.password);
      if (data.role === "admin" && !location.state?.from) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate(redirectTo, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-navy-950/[0.03] py-16">
      <div className="w-full max-w-sm bg-white border border-navy-900/10 p-8">
        <p className="eyebrow mb-2 text-center">JRL Property Connect</p>
        <h1 className="font-display text-xl text-navy-900 text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input-field"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-sm text-navy-700/70 text-center mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-brass-600 hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
