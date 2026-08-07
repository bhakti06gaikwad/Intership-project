import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import "../styles/navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <h2 className="logo">PyChronicle</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/history">History</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to="/variables">Variables</Link>

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "light" ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
