import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";

const Bill = () => {
  const [showModal, setShowModal] = useState(false);

  const [building, setBuilding] = useState("");
  const [assessment, setAssessment] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");

  return (
    <div className="flex">
      <Sidebar />
      <div className="grow ml-16 md:ml-64 h-screen lg:h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
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
                          Building
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
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-neutral-200 dark:border-white/10">
                        <td className="whitespace-nowrap  px-6 py-4 font-medium">
                          1
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">Mark</td>
                        <td className="whitespace-nowrap  px-6 py-4">Otto</td>
                        <td className="whitespace-nowrap  px-6 py-4">@mdo</td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          01/01/2024
                        </td>
                        <td className="whitespace-nowrap  px-6 py-4">
                          Pending
                        </td>
                      </tr>
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

                <form className="space-y-4">
                  {/* Building Dropdown */}
                  <div className="text-gray-700 w-full">
                    <select
                      className="w-full py-1 px-3 border outline-blue-200 rounded text-gray-700"
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                    >
                      <option value="">-- Select Building --</option>
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
                    Generate
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
