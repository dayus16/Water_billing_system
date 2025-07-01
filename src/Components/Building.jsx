import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { IoIosTrash } from "react-icons/io";

const Building = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [result, setResult] = useState("");
  const [size, setSize] = useState("");
  const [taxpayer, setTaxpayer] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [town, setTown] = useState("");
  const [purpose, setPurpose] = useState("");
  const [functions, setFunctions] = useState("");
  const [meterStatus, setMeterStatus] = useState("");
  const [taxpayerList, setTaxpayerList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [lgaList, setLgaList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [purposeList, setPurposeList] = useState([]);
  const [functionList, setFunctionList] = useState([]);
  const [buildings, setBuildings] = useState([]);

  const handleTaxpayer = async () => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/taxpayers`
      );
      const data = await res.json();
      console.log(data.taxpayersDetails);
      setTaxpayerList(data.taxpayersDetails);
      if (res.ok) {
        console.log("taxpayers retrieved successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed fetch", err);
    }
  };
  useEffect(() => {
    handleTaxpayer();
    handleState();
    handlePurpose();
    handleFunction();
    handleBuilding();
  }, []);

  const resetForm = () => {
    setName("");
    setStreet("");
    setAddress("");
    setState("");
    setLga("");
    setTown("");
    setSize("");
    setPurpose("");
    setFunctions("");
    setTaxpayer("");
    setMeterStatus("");
    setStateList([]);
    setLgaList([]);
    setTownList([]);
    setPurposeList([]);
    setFunctionList([]);
    setTaxpayerList([]);
  };

  const handleState = async () => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/states`
      );
      const data = await res.json();
      console.log(data.states);
      setStateList(data.states);
      if (res.ok) {
        console.log("states retrieve successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("Failed to fetch", err);
    }
  };

  const handleLga = async (stateId) => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/lgas/lga/${stateId}`
      );
      const data = await res.json();
      console.log(data.lgas);
      setLgaList(data.lgas);
      if (res.ok) {
        console.log("lga retrieve successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch lga", err);
    }
  };

  const handleTown = async (lgaId) => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/towns/${lgaId}`
      );
      const data = await res.json();
      console.log(data.townDetails);
      setTownList(data.townDetails);
      if (res.ok) {
        console.log("towns retrieve successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch town", err);
    }
  };

  const handlePurpose = async () => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/purposes`
      );
      const data = await res.json();
      console.log(data.purposeDetails);
      setPurposeList(data.purposeDetails);
      if (res.ok) {
        console.log("purposes retrieve successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch purpose", err);
    }
  };

  const handleFunction = async () => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/functions`
      );
      const data = await res.json();
      console.log(data.functionDetails);
      setFunctionList(data.functionDetails);
      if (res.ok) {
        console.log("functions retrieve successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch purpose", err);
    }
  };

  const getTaxpayerName = (id) => {
    const taxpayer = taxpayerList.find((item) => item.id === id);
    return taxpayer ? taxpayer.fullname : "Unknown";
  };

  const getFunctionName = (id) => {
    const func = functionList.find((item) => item.id === id);
    return func ? func.function : "Unknown";
  };

  const getPurposeName = (id) => {
    const purpose = purposeList.find((item) => item.id === id);
    return purpose ? purpose.purpose : "Unknown";
  };

  const handleBuilding = async () => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/buildings`
      );
      const data = await res.json();
      console.log(data.buildingDetails);
      setBuildings(data.buildingDetails);
      setIsLoading(false);
      if (res.ok) {
        console.log("building retrieved successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to retrieve buildings", err);
    }
  };

  const handleAddButton = async (e) => {
    e.preventDefault();
    setResult("creating....");
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/buildings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/Json",
          },
          body: JSON.stringify({
            name,
            address,
            street,
            function_id: functions,
            state_id: state,
            lga_id: lga,
            town_id: town,
            purpose_id: purpose,
            size,
            taxpayer_id: taxpayer,
            is_metered: meterStatus,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        console.log("Building created successfully");
        toast.success("Building created successfully");
        setResult("Create");
        setTimeout(() => {
          resetForm();
          setShowModal(false);
          handleBuilding();
        }, 2000);
      } else {
        toast.error(data.message);
        console.log(data.message);
        setResult("Create");
      }
    } catch (err) {
      console.error("Failed to add building due to network error", err);
      toast.error("Network error", err);
    }
  };

  return (
    <div className="flex overflow-hidden">
      <Sidebar />

      {/* Main Content Area */}
      <div className="grow ml-16 md:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />
        {/* ---------------table Modal-----------------    */}
        <div className="p-4">
          <div className="md:flex justify-between p-5">
            <div className="text-2xl font-bold">
              <h1>Building</h1>
            </div>
            <div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-500 cursor-pointer font-semibold rounded text-xl py-1 px-4"
              >
                Create <IoMdAdd className="font-bold" />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="flex flex-col p-5">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                    <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                      <tr>
                        <th scope="col" className="px-6 py-4">
                          #
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Taxpayer
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Function
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Purpose
                        </th>
                        <th scope="col" className="px-6 py-4">
                          meter-status
                        </th>
                        <th scope="col" className="px-6 py-4">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            Loading.....
                          </td>
                        </tr>
                      ) : buildings.length > 0 ? (
                        buildings.map((building, index) => (
                          <tr
                            key={building.id || index}
                            className="border-b border-neutral-200 dark:border-white/10"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {building.name}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {getTaxpayerName(building.taxpayer_id)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {getFunctionName(building.function_id)}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {getPurposeName(building.purpose_id)}
                            </td>

                            <td className="whitespace-nowrap px-6 py-4">
                              {building.is_metered ? "metered" : "Unmetered"}
                            </td>
                            <td className=" px-6 py-4 text-2xl cursor-pointer flex">
                              <FaEdit />
                              <IoIosTrash />
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center py-4">
                            No Building Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
              <div className="flex justify-between items-center border-b border-b-gray-600 pb-2 mb-4">
                <h3 className="text-xl font-semibold text-black">Building</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-700 text-xl hover:text-gray-900 cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-4" onSubmit={handleAddButton}>
                <div className="text-gray-700">
                  <label className="block mb-2 text-sm font-medium">Name</label>
                  <input
                    type="text"
                    className="w-full py-1 px-3 border outline-blue-200 rounded"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <div className="text-gray-700 w-full">
                    <label className="block mb-2 text-sm font-medium">
                      Size (per rooms)
                    </label>
                    <input
                      type="text"
                      className="w-full py-1 px-3 border outline-blue-200 rounded"
                      placeholder="Size"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-gray-700 w-full">
                    <label className="block mb-2 text-sm font-medium">
                      Taxpayer
                    </label>
                    <select
                      className="w-full py-1 px-3 border outline-blue-200 rounded text-gray-700"
                      value={taxpayer}
                      onChange={(e) => setTaxpayer(e.target.value)}
                    >
                      <option value="">Taxpayers</option>
                      {taxpayerList.map((taxpayerItem) => (
                        <option key={taxpayerItem.id} value={taxpayerItem.id}>
                          {taxpayerItem.fullname}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="text-gray-700">
                  <label
                    htmlFor="street"
                    className="block mb-2 text-sm font-medium"
                  >
                    Street
                  </label>
                  <input
                    type="text"
                    className="w-full py-1 px-3 border outline-blue-200 rounded"
                    placeholder="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    required
                  />
                </div>

                <div className="text-gray-700">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium"
                  >
                    Address
                  </label>
                  <textarea
                    className="w-full py-1 px-3 border outline-blue-200 rounded"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    className="flex-1 py-1 px-3 border border-gray-300 outline-blue-200 rounded text-gray-700"
                    value={state}
                    onChange={(e) => {
                      const selectedState = e.target.value;
                      setState(selectedState);
                      handleLga(selectedState);
                    }}
                  >
                    <option value="">-- Select a state --</option>
                    {stateList.map((stateItem) => (
                      <option key={stateItem.id} value={stateItem.id}>
                        {stateItem.state}
                      </option>
                    ))}
                  </select>
                  <select
                    className="flex-1 py-1 px-3 border border-gray-300 outline-blue-200 rounded text-gray-700"
                    value={lga}
                    onChange={(e) => {
                      const selectedLga = e.target.value;
                      setLga(selectedLga);
                      handleTown(selectedLga);
                    }}
                  >
                    <option value="">-- Select an LGA --</option>
                    {lgaList.map((lgaItem) => (
                      <option key={lgaItem.id} value={lgaItem.id}>
                        {lgaItem.lga}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <select
                    className="w-full py-1 px-3 border border-gray-300 outline-blue-200 rounded text-gray-700"
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                  >
                    <option value="">-- Select a town --</option>
                    {townList.map((townItem) => (
                      <option key={townItem.id} value={townItem.id}>
                        {townItem.town}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full py-1 px-3 border border-gray-300 outline-blue-200 rounded text-gray-700"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                  >
                    <option value="">Purpose</option>
                    {purposeList.map((purpose) => (
                      <option key={purpose.id} value={purpose.id}>
                        {purpose.purpose}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <select
                    className="w-full py-1 px-3 border border-gray-300 outline-blue-200 rounded text-gray-700"
                    value={functions}
                    onChange={(e) => setFunctions(e.target.value)}
                  >
                    <option value="">Function</option>
                    {functionList.map((functionItem) => (
                      <option key={functionItem.id} value={functionItem.id}>
                        {functionItem.function}
                      </option>
                    ))}
                  </select>
                  <select
                    className="w-full py-1 px-3 border border-gray-300 outline-blue-200 rounded text-gray-700"
                    value={meterStatus}
                    onChange={(e) => setMeterStatus(e.target.value === "true")}
                  >
                    <option value="">-- Meter-status --</option>
                    <option value="true">Metered</option>
                    <option value="false">Unmetered</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-700 text-white py-2 font-semibold cursor-pointer rounded hover:bg-blue-800"
                >
                  {result ? result : " Create"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Building;
