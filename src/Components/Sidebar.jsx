import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaBox,
  FaBuilding,
  FaPowerOff,
  FaClipboardList,
} from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="h-screen px-2 py-4 fixed w-16 md:w-64 flex flex-col items-center md:items-start border-r border-gray-300 dark:border-gray-600 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl font-bold hidden md:block mt-4 text-center italic">
        Hello {email}
      </h1>
      <ul className="flex flex-col mt-5 text-xl w-full">
        <Link to="/homepage">
          <li
            title="Dashboard"
            className="flex flex-col md:flex-row items-center justify-center md:justify-start py-3 px-2 hover:bg-blue-600 hover:text-white rounded cursor-pointer"
          >
            <FaTachometerAlt className="text-xl" />
            <span className="hidden md:inline md:ml-2">Dashboard</span>
          </li>
        </Link>
        <Link to="/taxpayer">
          <li
            title="Taxpayer"
            className="flex flex-col md:flex-row items-center justify-center md:justify-start py-3 px-2 hover:bg-blue-600 hover:text-white rounded cursor-pointer"
          >
            <FaUser className="text-xl" />
            <span className="hidden md:inline md:ml-2">Taxpayer</span>
          </li>
        </Link>
        <Link to="/building">
          <li
            title="Building"
            className="flex flex-col md:flex-row items-center justify-center md:justify-start py-3 px-2 hover:bg-blue-600 hover:text-white rounded cursor-pointer"
          >
            <FaBox className="text-xl" />
            <span className="hidden md:inline md:ml-2">Building</span>
          </li>
        </Link>
        <Link to="/assessment">
          <li
            title="Assessment"
            className="flex flex-col md:flex-row items-center justify-center md:justify-start py-3 px-2 hover:bg-blue-600 hover:text-white rounded cursor-pointer"
          >
            <FaClipboardList className="text-xl" />
            <span className="hidden md:inline md:ml-2">Assessment</span>
          </li>
        </Link>
        <Link to="/bill">
          <li
            title="Bill payment"
            className="flex flex-col md:flex-row items-center justify-center md:justify-start py-3 px-2 hover:bg-blue-600 hover:text-white rounded cursor-pointer"
          >
            <FaBuilding className="text-xl" />
            <span className="hidden md:inline md:ml-2">Bill Payment</span>
          </li>
        </Link>
        <li
          onClick={handleLogout}
          title="Logout"
          className="flex flex-col md:flex-row items-center justify-center md:justify-start py-3 px-2 hover:bg-blue-600 hover:text-white rounded cursor-pointer"
        >
          <FaPowerOff className="text-xl" />
          <span className="hidden md:inline md:ml-2">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
