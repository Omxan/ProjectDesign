import { Outlet, Link, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-700 text-white flex flex-col p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Air Purifier</h1>
        <nav className="flex flex-col space-y-2">
          <Link to="/dashboard" className={`p-2 rounded ${location.pathname === "/dashboard" ? "bg-blue-900" : "hover:bg-blue-800"}`}>Dashboard</Link>
          <Link to="/history" className={`p-2 rounded ${location.pathname === "/history" ? "bg-blue-900" : "hover:bg-blue-800"}`}>History</Link>
          <Link to="/settings" className={`p-2 rounded ${location.pathname === "/settings" ? "bg-blue-900" : "hover:bg-blue-800"}`}>Settings</Link>
        </nav>
        <div className="mt-auto">
          <Link to="/" className="bg-red-600 hover:bg-red-700 p-2 rounded block text-center">Logout</Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
