import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4 fixed">
      <h2 className="text-lg font-bold">Menu</h2>
      <ul className="mt-4">
        <li className="mb-2"><Link to="/dashboard">Dashboard</Link></li>
        <li className="mb-2"><Link to="/notes">Notes</Link></li>
        <li className="mb-2"><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
