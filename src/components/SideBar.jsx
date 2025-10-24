import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Gauge, History, Settings, LogOut } from "lucide-react";
import { useUser } from "../context/UserContext";

const brand = "#BE7B45"; 

const linkBase =
  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition";
const active = "bg-[--brand] text-white shadow-sm";
const idle = "text-gray-700 hover:bg-gray-100";

export default function Sidebar() {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const initials = user?.username
    ? user.username
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside
      className="w-[240px] flex-col bg-white border-r border-gray-200 hidden md:flex"
      style={{ "--brand": brand }}
    >
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[--brand] text-white font-bold">
          AiP
        </div>
        <div>
          <div className="text-sm font-semibold">Adaptive Air Purifier</div>
        </div>
      </div>

      <nav className="p-3 space-y-1">
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}
        >
          <Gauge className="h-4 w-4" />
          Dashboard
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}
        >
          <History className="h-4 w-4" />
          History
        </NavLink>
        <NavLink
          to="/settings"
          className={({ isActive }) => `${linkBase} ${isActive ? active : idle}`}
        >
          <Settings className="h-4 w-4" />
          Settings
        </NavLink>
      </nav>

      <div className="mt-auto p-3 border-t">
        <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gray-100 text-xs font-medium">
            {initials}
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">{user?.username || "Guest"}</div>
            <div className="text-xs text-gray-500">
              {user ? "Logged in" : "Offline mode"}
            </div>
          </div>
          <LogOut className="h-4 w-4 text-gray-500" />
        </div>
        <button
          onClick={handleLogout}
          className="mt-2 w-full rounded-lg border py-2 text-sm hover:bg-gray-50"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
