import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import '../styles/navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) => location.pathname === path;

  if (!user) return null;

  return (
    <nav className="navbar">

      {/* LEFT */}
      <div className="nav-left">
        <Link to="/" className="logo-link">
          <span className="logo-icon">{`</>`}</span>
          <span className="logo-text">Code Assistant</span>
        </Link>
      </div>

      {/* RIGHT */}
      <div className="nav-right">
        <Link
          to="/"
          className={`nav-link ${isActive('/') ? 'active' : ''}`}
        >
          Home
        </Link>

        <Link
          to="/history"
          className={`nav-link ${isActive('/history') ? 'active' : ''}`}
        >
          History
        </Link>


        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;