import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        PyChronicle
      </div>

      <div className="nav-links">

        <Link to="/">Dashboard</Link>

        <Link to="/history">History</Link>

        <Link to="/timeline">Timeline</Link>

        <Link to="/variables">Variables</Link>

      </div>

    </nav>
  );
}

export default Navbar;
