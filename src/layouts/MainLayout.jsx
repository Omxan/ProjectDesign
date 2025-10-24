import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideBar from "../components/SideBar";

export default function MainLayout() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/history":
        return "History";
      case "/settings":
        return "Settings";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SideBar />

      <div className="flex-1 flex flex-col">
        <div className="bg-white shadow flex items-center px-6 py-4">
          <h1 className="text-xl font-bold text-gray-800">{getTitle()}</h1>
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
