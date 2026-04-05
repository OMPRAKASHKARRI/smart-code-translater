import { useState } from "react";
import "../styles/login.css";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login, googleLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    const res = await login(email, password);

    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>🚀 AI Code Assistant</h1>
        <p>Debug, optimize, and understand your code with powerful AI.</p>
      </div>

      <div className="login-right">
        <div className="login-card">

          <h2>Welcome Back 👋</h2>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-btn" type="submit">
              Sign In
            </button>
          </form>

          <div className="divider">OR</div>

          <GoogleLogin
            onSuccess={(res) => {
              googleLogin(res);
              navigate("/");
            }}
            onError={() => console.log("Google Failed ❌")}
          />

          <p className="signup-text">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default LoginPage;