import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirectTo = location.state?.from || "/list-your-property";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password, form.phone);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Could not create your account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-navy-950/[0.03] py-16">
      <div className="w-full max-w-sm bg-white border border-navy-900/10 p-8">
        <p className="eyebrow mb-2 text-center">JRL Property Connect</p>
        <h1 className="font-display text-xl text-navy-900 text-center mb-6">Create Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="input-field"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
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
            placeholder="Phone number (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          <input
            className="input-field"
            type="password"
            placeholder="Password (min. 6 characters)"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={6}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading}>
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>
        <p className="text-sm text-navy-700/70 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-brass-600 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
