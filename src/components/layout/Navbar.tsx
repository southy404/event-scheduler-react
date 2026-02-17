import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/signin");
  }

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
      <Link to="/" className="font-bold text-lg">
        EventScheduler
      </Link>

      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/create">Create Event</Link>
            <button onClick={handleLogout} className="text-red-500">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}
