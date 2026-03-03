import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${baseURL}/register`, {
        name,
        email,
        password,
      });

      if (res.data.token) {
        login(res.data.token, res.data.user);
      } else {
        const resLogin = await axios.post(`${baseURL}/login`, {
          email,
          password,
        });
        login(resLogin.data.token, resLogin.data.user);
      }

      navigate("/dashboard");
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors[0].msg);
      } else {
        setError(err.response?.data?.message || "Registration failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow space-y-4 w-80"
      >
        <h2 className="text-xl font-bold text-center">Register</h2>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          className="border p-2 w-full"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full"
          type="email"
          autoComplete="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="border p-2 w-full"
          type="password"
          autoComplete="new-password"
          minLength={6}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          disabled={loading}
          className="bg-blue-600 text-white w-full p-2 rounded disabled:opacity-60"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
