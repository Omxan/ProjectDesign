import { NavLink } from "react-router-dom";
import { Gauge, History, Settings, LogOut } from "lucide-react";

const brand = "#BE7B45"; // warm brown/orange

const linkBase =
  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm transition";
const active = "bg-[--brand] text-white shadow-sm";
const idle = "text-gray-700 hover:bg-gray-100";

export default function Sidebar() {
  return (
    <aside
      className="w-[240px] flex-col bg-white border-r border-gray-200 hidden md:flex"
      style={{ "--brand": brand }}
    >
      <div className="flex items-center gap-3 p-4 border-b">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-[--brand] text-white font-bold">
          CO₂
        </div>
        <div>
          <div className="text-sm font-semibold">CO₂ Monitor</div>
          <div className="text-xs text-gray-500">Air Quality System</div>
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
            JD
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">John Doe</div>
            <div className="text-xs text-gray-500">john.doe@example.com</div>
          </div>
          <LogOut className="h-4 w-4 text-gray-500" />
        </div>
        <button className="mt-2 w-full rounded-lg border py-2 text-sm hover:bg-gray-50">
          Sign Out
        </button>
      </div>
    </aside>
  );
}
