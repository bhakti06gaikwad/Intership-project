import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>PyChronicle</h2>

      <div>
        <Link to="/">Dashboard</Link> {" | "}
        <Link to="/history">History</Link> {" | "}
        <Link to="/timeline">Timeline</Link> {" | "}
        <Link to="/variables">Variables</Link>
      </div>
    </nav>
  );
}

export default Navbar;
