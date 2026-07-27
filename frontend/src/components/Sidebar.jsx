import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <aside className="sidebar">
      <h3>Menu</h3>

      <ul>
    <li><Link to="/">Dashboard</Link></li>
    <li><Link to="/history">History</Link></li>
    <li><Link to="/timeline">Timeline</Link></li>
    <li><Link to="/variables">Variables</Link></li>
</ul>
    </aside>
  );
}

export default Sidebar;
