import React from "react";
import Card from "./Card";
import { FaBox, FaCog, FaShoppingCart,FaUser,FaBuilding  } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card icon={<FaUser />} title="Taxpayer" value="10" />
        <Card icon={<FaBuilding  />} title="Bills" value="3" />
        <Card icon={<FaBox />} title="Building" value="4" />
        <Card icon={<FaCog />} title="Settings" value="11" />
      </div>
    </div>
  );
};

export default Dashboard;
