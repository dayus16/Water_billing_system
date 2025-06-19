import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { IoMdAdd } from "react-icons/io";

const Taxpayer = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex">
      <Sidebar />
      <div className="grow ml-16 md:ml-64 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Navbar />

        {/* --------------Modal Content---------------- */}
        <div className="p-4">
          {/* Button to toggle modal */}
          <div className="md:flex justify-between p-5">
            <div className="text-2xl font-bold">
              <h1>Taxpayer</h1>
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

          {/* Modal */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
                <div className="flex justify-between items-center border-b border-b-gray-600 pb-2 mb-4">
                  <h3 className="text-xl font-semibold text-black">Taxpayer</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-700 text-xl hover:text-gray-900 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <form className="space-y-4">
                  <div className="text-gray-700">
                    <label
                      htmlFor="text"
                      className="block mb-2 text-sm font-medium"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="email"
                      className="w-full py-1 px-3 border outline-blue-200 rounded"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="text-gray-700">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full py-1 px-3 border outline-blue-200 rounded"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                    <div className="text-gray-700">
                      <label
                        htmlFor="number"
                        className="block mb-2 text-sm font-medium"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phoneNumber"
                        className="w-full py-1 px-3  outline-blue-200 border rounded"
                        placeholder="Phone Number"
                        required
                      />
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
                      type="street"
                      id="street"
                      className="w-full py-1 px-3  outline-blue-200 border rounded"
                      placeholder="street"
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
                      type="text"
                      id="Address"
                      className="w-full py-1 px-3  outline-blue-200 border rounded"
                      placeholder="Address"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <select className="flex-1 py-1 px-3 border  outline-blue-200 rounded text-gray-700">
                      <option value="">-- Select a state --</option>
                    </select>
                    <select className="flex-1 py-1 px-3 border  outline-blue-200 rounded text-gray-700">
                      <option value="">-- Select an LGA --</option>
                    </select>
                  </div>
                  <div className="flex gap-2">
                    <select className="w-full py-1 px-3 border border-gray-300  outline-blue-200 rounded text-gray-700">
                      <option value="">-- Select a town --</option>
                    </select>
                    <select className="w-full py-1 px-3 border border-gray-300  outline-blue-200 rounded text-gray-700">
                      <option value="">-- Employment status --</option>
                      <option value="employed">Employed</option>
                      <option value="unemployed">Unemployed</option>
                      <option value="self-employed">Self-Employed</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-700 text-white py-2 font-semibold cursor-pointer rounded hover:bg-blue-800"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>

        {/* --------------Table--------------------------- */}
       <div className="p-7 overflow-x-auto">
  <table className="min-w-[800px] w-full text-center text-sm font-light text-surface dark:text-white">
    <thead className="border-b border-neutral-200 bg-neutral-50 font-medium dark:border-white/10 dark:text-neutral-800">
      <tr>
        <th scope="col" className="px-6 py-4">#</th>
        <th scope="col" className="px-6 py-4">Fullname</th>
        <th scope="col" className="px-6 py-4">Phone No.</th>
        <th scope="col" className="px-6 py-4">Email</th>
        <th scope="col" className="px-6 py-4">State</th>
        <th scope="col" className="px-6 py-4">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr className="border-b border-neutral-200 dark:border-white/10">
        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
        <td className="whitespace-nowrap px-6 py-4">Mark</td>
        <td className="whitespace-nowrap px-6 py-4">08012345678</td>
        <td className="whitespace-nowrap px-6 py-4">mark@example.com</td>
        <td className="whitespace-nowrap px-6 py-4">Lagos</td>
        <td className="whitespace-nowrap px-6 py-4">Edit | Delete</td>
      </tr>
    </tbody>
  </table>
</div>

      </div>
    </div>
  );
};

export default Taxpayer;
