import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";

const Bill = () => {
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [building, setBuilding] = useState("");
  const [assessment, setAssessment] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [buildingMessage, setBuildingMessage] = useState("");
  const [assessmentMessage, setAssessmentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [stateList, setStateList] = useState([]);
  const [lgaList, setLgaList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [assessmentList, setAssessmentList] = useState([]);
  const [billList, setBillList] = useState([]);

  const handleGenerateButton = async (e) => {
    e.preventDefault();
    setResult("Generating....");
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/billings/generate`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            building_id: building,
            assessment_item_id: assessment,
            from_date: from,
            to_date: to,
            status,
          }),
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        toast.success("Bill generated successfully");
        console.log("Bill generated successfully");
        setResult("Generate");
        setTimeout(() => {
          setShowModal(false);
          handleBillTable();
          resetForm();
        }, 2000);
      } else {
        toast.error(data.message);
        console.log(data.message);
      }
    } catch (err) {
      toast.error("failed due to network error", err);
      console.log("failed due to network error", err);
    }
  };

  const resetForm = () => {
    setLga("");
    setState("");
    setBuilding("");
    setFrom("");
    setTo("");
    setAssessment("");
    setStateList([]);
    setLgaList([]);
    setBuildingList([]);
    setAssessmentList([]);
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

  const handleAssessment = async (buildingId) => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/assessments/${buildingId}`
      );
      const data = await res.json();
      console.log(data.details);
      if (data.details.length === 0) {
        setAssessmentMessage("No assessment found for this building");
      } else {
        setAssessmentMessage("");
      }
      setAssessmentList(data.details);

      if (res.ok) {
        console.log("Assessments retrieved successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to retrieve assessment", err);
    }
  };

  const handleBillTable = async () => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/billings`
      );
      const data = await res.json();
      console.log(data.billingDetails);
      setBillList(data.billingDetails);
      setIsLoading(false);
      if (res.ok) {
        console.log("Billings retrieved successfully");
      } else {
        console.log(data.message);
      }
    } catch (err) {
      console.log("failed to fetch bills", err);
    }
  };

  useEffect(() => {
    handleState();
    handleBillTable();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="grow ml-16 md:ml-64 h-screen lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
        <Navbar />
        <div className="p-4">
          <div className="md:flex justify-between p-5">
            <div className="text-2xl font-bold">
              <h1>Billings</h1>
            </div>
            <div>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-1 text-white bg-blue-700 hover:bg-blue-500 cursor-pointer font-semibold rounded text-xl py-1 px-4"
              >
                Generate <IoMdAdd className="font-bold" />
              </button>
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
                          Assessment
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          From
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          To
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Status
                        </th>
                        <th scope="col" className=" px-6 py-4">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            Loading....
                          </td>
                        </tr>
                      ) : billList.length > 0 ? (
                        billList.map((billItem, index) => (
                          <tr
                            className="border-b border-neutral-200 dark:border-white/10"
                            key={billItem.id || index}
                          >
                            <td className="whitespace-nowrap  px-6 py-4 font-medium">
                              {index + 1}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {billItem.assessment_item_id}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {new Date(
                                billItem.from_date
                              ).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {new Date(billItem.to_date).toLocaleDateString()}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              {billItem.status}
                            </td>
                            <td className="whitespace-nowrap  px-6 py-4">
                              #{billItem.amount}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center py-4">
                            No Billing found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* -------------------Modal---------------------------------- */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center border-b border-b-gray-600 pb-2 mb-4">
                  <h3 className="text-xl font-semibold text-black">
                    Generate Bills
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-700 text-xl hover:text-gray-900 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form className="space-y-4" onSubmit={handleGenerateButton}>
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
                      onChange={(e) => {
                        const selectedBuilding = e.target.value;
                        setBuilding(selectedBuilding);
                        handleAssessment(selectedBuilding);
                      }}
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

                  {/* Assessment Dropdown */}
                  <div className="text-gray-700 w-full">
                    <select
                      className="w-full py-1 px-3 border outline-blue-200 rounded text-gray-700"
                      value={assessment}
                      onChange={(e) => setAssessment(e.target.value)}
                    >
                      <option value="">-- Select Assessment --</option>
                      {assessmentList.length > 0 ? (
                        assessmentList.map((assessmentItem) => (
                          <option
                            key={assessmentItem.id}
                            value={assessmentItem.id}
                          >
                            {assessmentItem.rate}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          {assessmentMessage || "No assessments found"}
                        </option>
                      )}
                    </select>
                  </div>

                  {/* From Date */}
                  <div className="text-gray-700">
                    <label className="block mb-2 text-sm font-medium">
                      From
                    </label>
                    <input
                      type="date"
                      className="w-full py-1 px-3 border outline-blue-200 rounded"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      required
                    />
                  </div>

                  {/* To Date */}
                  <div className="text-gray-700">
                    <label className="block mb-2 text-sm font-medium">To</label>
                    <input
                      type="date"
                      className="w-full py-1 px-3 border outline-blue-200 rounded"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      required
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div className="text-gray-700 w-full">
                    <select
                      className="w-full py-1 px-3 border outline-blue-200 rounded text-gray-700"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Status</option>
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-2 font-semibold cursor-pointer rounded hover:bg-blue-800"
                  >
                    {result ? result : "Generate"}
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

export default Bill;
