import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [taxpayers, setTaxpayers] = useState([]);
  const [buildings, setBuildings] = useState([]);

  const fetchTaxpayers = async () => {
    try {
      const res = await fetch(
        "https://water-billing-72y7.onrender.com/api/v1/taxpayers"
      );
      const data = await res.json();
      console.log(data.taxpayersDetails);
      setTaxpayers(data.taxpayersDetails);
    } catch (err) {
      console.error("Failed to fetch taxpayers", err);
    }
  };

  const fetchBuildings = async () => {
    try {
      const res = await fetch(
        "https://water-billing-72y7.onrender.com/api/v1/buildings"
      );
      const data = await res.json();
      console.log(data.buildingDetails);
      setBuildings(data.buildingDetails);
    } catch (err) {
      console.error("Failed to fetch buildings", err);
    }
  };

  useEffect(() => {
    fetchTaxpayers();
    fetchBuildings();
  }, []);
  return (
    <div className="flex">
      <Sidebar />
      <div
        className="grow ml-16 md:ml-64 h-screen lg:h-screen bg-gray-100 text-gray-900
      dark:bg-gray-900 dark:text-white"
      >
        <Navbar />
        <div>
          <Dashboard
            taxpayersCount={taxpayers.length}
            buildingCount={buildings.length}
          />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
