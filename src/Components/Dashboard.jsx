import React from "react";
import Card from "./Card";
import {
  FaBox,
  FaCog,
  FaShoppingCart,
  FaUser,
  FaBuilding,
  FaClipboardList,
} from "react-icons/fa";

const Dashboard = ({ taxpayersCount, buildingCount }) => {
  return (
    <div className="grow p-8">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-6">
        <Card icon={<FaUser />} title="Taxpayer" value={taxpayersCount} />
        <Card icon={<FaBox />} title="Building" value={buildingCount} />
        <Card icon={<FaClipboardList />} title="Assessment" value="12" />
        <Card icon={<FaBuilding />} title="Bills" value="3" />
      </div>
    </div>
  );
};
export default Dashboard;
