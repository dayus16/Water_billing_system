import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

const Assessment = () => {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [building, setBuilding] = useState("");
  const [meterReadng, setMeterReading] = useState("");
  const [meterId, setmeterId] = useState("");
  const [stateList, setStateList] = useState([]);
  const [lgaList, setLgaList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [buildingMessage, setBuildingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [assessment, setAssessment] = useState([]);

  const handleAssessment = async (e) => {
    e.preventDefault();
    setResult("creating....");
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/assessments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/Json",
          },
          body: JSON.stringify({
            building_id: building,
            meter_reading: meterReadng,
            meter_id: meterId,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success("Assessment Item created seccessfully");
        console.log("Assessment Item created seccessfully");
        setResult("Create");
        setTimeout(() => {
          handleAllAssessment();
          resetForm();
          setShowModal(false);
        }, 2000);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (err) {
      toast.error("failed to fetch", err);
      console.log("failed to fetch", err);
    }
  };

  const resetForm = () => {
    setLga("");
    setState("");
    setBuilding("");
    setMeterReading("");
    setmeterId("");
    setStateList([]);
    setLgaList([]);
    setBuildingList([]);
  };

  const handleAllAssessment = async () => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/assessments`
      );
      const data = await res.json();
      console.log(data.assessmentDetails);
      setAssessment(data.assessmentDetails);
      setIsLoading(false);
      if (res.ok) {
        console.log("Assessment retrieved successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch assessment", err);
    }
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
        console.log("state retrieved successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch states", err);
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
        console.log("LGA retrieved successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch LGAs", err);
    }
  };

  const handleBuilding = async (lgaId) => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/buildings/${lgaId}`
      );
      const data = await res.json();
      console.log(data.buildingDetails);
      if (data.buildingDetails.length === 0) {
        setBuildingMessage("No building found for this LGa");
      } else {
        setBuildingMessage("");
      }
      setBuildingList(data.buildingDetails);
      if (res.ok) {
        console.log("Buildings retrieved successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch buildings", err);
    }
  };

  useEffect(() => {
    handleState();
    handleAllAssessment();
  }, []);
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <div className="grow ml-16 md:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
          <Navbar />
          <div className="p-4">
            <div className="md:flex justify-between p-5">
              <div className="text-2xl font-bold">
                <h1>Assessment Item</h1>
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
          </div>

          {/* -----------------------Assessment Table--------------------------------- */}
          <div className="flex flex-col p-5 overflow-hidden">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full text-center text-sm font-light text-surface dark:text-white">
                    <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
                      <tr>
                        <th scope="col" className=" px-6 py-4">
                          #
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Building
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Meter ID
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Meter Reading
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Rate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            Loading....
                          </td>
                        </tr>
                      ) : assessment.length > 0 ? (
                        assessment.map((assessmentItem, index) => (
                          <tr
                            key={assessmentItem.id || index}
                            className="border-b border-neutral-200 dark:border-white/10"
                          >
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {assessmentItem.building_id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {assessmentItem.meter_id}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {assessmentItem.meter_reading}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {assessmentItem.rate}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-4">
                            No Assessment found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center border-b border-b-gray-600 pb-2 mb-4">
                  <h3 className="text-xl font-semibold text-black">
                    Create Assessment
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-700 text-xl hover:text-gray-900 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleAssessment}>
                  <div className="text-gray-700 w-full">
                    <select
                      className="w-full py-1 px-3 border outline-blue-200 rounded text-gray-700"
                      value={state}
                      onChange={(e) => {
                        const selectedState = e.target.value;
                        setState(selectedState);
                        handleLga(selectedState);
                      }}
                    >
                      <option value="">-- Select a State --</option>
                      {stateList.map((stateItem) => (
                        <option key={stateItem.id} value={stateItem.id}>
                          {stateItem.state}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="text-gray-700 w-full">
                    <select
                      className="w-full py-1 px-3 border outline-blue-200 rounded text-gray-700"
                      value={lga}
                      onChange={(e) => {
                        const selectedLga = e.target.value;
                        setLga(selectedLga);
                        handleBuilding(selectedLga);
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
                  <div className="text-gray-700 w-full">
                    <select
                      className="w-full py-1 px-3 border outline-blue-200 rounded text-gray-700"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                    >
                      <option value="">-- Select Building --</option>
                      {buildingList.length > 0 ? (
                        buildingList.map((buildingItem) => (
                          <option key={buildingItem.id} value={buildingItem.id}>
                            {buildingItem.name}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          {buildingMessage || "No buildings found"}
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="text-gray-700">
                    <label className="block mb-2 text-sm font-medium">
                      Meter-reading
                    </label>
                    <input
                      type="text"
                      className="w-full py-1 px-3 border outline-blue-200 rounded"
                      placeholder="Meter-reading"
                      value={meterReadng}
                      onChange={(e) => setMeterReading(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-gray-700">
                    <label className="block mb-2 text-sm font-medium">
                      Meter-ID
                    </label>
                    <input
                      type="text"
                      className="w-full py-1 px-3 border outline-blue-200 rounded"
                      placeholder="ET-BAAJ-6001"
                      value={meterId}
                      onChange={(e) => setmeterId(e.target.value)}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-2 font-semibold cursor-pointer rounded hover:bg-blue-800"
                  >
                    {result ? result : "Create"}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;
