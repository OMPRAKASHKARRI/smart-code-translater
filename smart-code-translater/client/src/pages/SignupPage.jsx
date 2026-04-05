import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/login.css";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { register } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert("Fill all fields");
      return;
    }

    const res = await register(username, email, password);

    if (res.success) {
      navigate("/");
    }
  };

  return (
    <div className="login-page">

      {/* LEFT */}
      <div className="login-left">
        <h1>🚀 AI Code Assistant</h1>
        <p>Create your account and start coding smarter.</p>

        <div className="features">
          <div>🔧 Debug faster</div>
          <div>📚 Learn easily</div>
          <div>⚡ Optimize code</div>
          <div>🧪 Test instantly</div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">
        <div className="login-card">

          <h2>Create Account ✨</h2>

          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

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
              Sign Up
            </button>
          </form>

          <p className="signup-text">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default SignupPage;