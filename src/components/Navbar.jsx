import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark px-4 w-100">
      <div className="container d-flex justify-content-between">
        <Link className="navbar-brand" to="/">MovieApp</Link>

        <div className="navbar-nav gap-3 align-items-center">
          <Link className="nav-link" to="/movies">Movies</Link>
          {user ? (
            <>
              {/* <span className="nav-link text-light">
                Welcome, {user.role === "admin" ? "Admin" : "User"}
              </span> */}

              {user.role === "admin" && (
                <Link className="nav-link" to="/admin">Admin Dashboard</Link>
              )}

              <Link className="nav-link" to="/profile">Profile</Link>

              <button
                onClick={handleLogout}
                className="btn btn-sm btn-outline-light ms-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">Login</Link>
              <Link className="nav-link" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
