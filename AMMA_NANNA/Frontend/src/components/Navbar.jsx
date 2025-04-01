import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-xl font-bold">Markdown App</h1>
      <div>
        <Link to="/dashboard" className="mx-2">Dashboard</Link>
        <Link to="/notes" className="mx-2">Notes</Link>
        <Link to="/logout" className="mx-2">Logout</Link>
      </div>
    </nav>
  );
};

export default Navbar;
