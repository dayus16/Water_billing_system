import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { IoMdAdd, IoIosTrash } from "react-icons/io";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";

const Taxpayer = () => {
  const [showModal, setShowModal] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [lga, setLga] = useState("");
  const [town, setTown] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [stateList, setStateList] = useState([]);
  const [lgaList, setLgaList] = useState([]);
  const [townList, setTownList] = useState([]);
  const [result, setResult] = useState("");
  const [taxpayers, setTaxpayers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTaxpayer, setSelectedTaxpayer] = useState(null);
  const [deleteTaxpayer, setDeleteTaxpayer] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const resetForm = () => {
    setFullname("");
    setEmail("");
    setPhoneNumber("");
    setStreet("");
    setAddress("");
    setState("");
    setLga("");
    setTown("");
    setEmploymentStatus("");
    setStateList([]);
    setLgaList([]);
    setTownList([]);
    setSelectedTaxpayer(null);
  };

  const handleDeleteClick = (taxpayer) => {
    setSelectedTaxpayer(taxpayer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTaxpayer(null);
  };

  const handleConfirmDelete = () => {
    console.log("Deleting taxpayer with ID:", selectedTaxpayer.id);
    handleDeleteButton();
  };

  const handleDeleteButton = async () => {
    setDeleteTaxpayer("deleting....");
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/taxpayers/${selectedTaxpayer.id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json;
      console.log(data);
      if (res.ok) {
        console.log("taxpayer deleted successfully");
        toast.success("taxpayer deleted successfully");
        setTaxpayers((prevTaxpayers) =>
          prevTaxpayers.filter((tax) => tax.id !== selectedTaxpayer.id)
        );
        setIsModalOpen(false);
      } else {
        console.log(data.message);
        toast.error("failed to delete taxpayer", data.message);
      }
    } catch (err) {
      console.error("failed to delete taxpayer", err);
    }
  };

  const handleEditClick = (taxpayer) => {
    setSelectedTaxpayer(taxpayer);
    setFullname(taxpayer.fullname);
    setEmail(taxpayer.email);
    setPhoneNumber(taxpayer.phone_number);
    setStreet(taxpayer.street);
    setAddress(taxpayer.address);
    setState(taxpayer.state_id);
    setLga(taxpayer.lga_id);
    setTown(taxpayer.town_id);
    setEmploymentStatus(taxpayer.employment_status);
    handleLga(taxpayer.state_id);
    handleTown(taxpayer.lga_id);
    setShowModal(true);
  };

  const handleSaveBtn = async (e) => {
    e.preventDefault();
    setResult("Creating....");

    const url = selectedTaxpayer
      ? `https://water-billing-72y7.onrender.com/api/v1/taxpayers/${selectedTaxpayer.id}`
      : `https://water-billing-72y7.onrender.com/api/v1/taxpayers`;

    const method = selectedTaxpayer ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          email,
          phone_number: phoneNumber,
          street,
          address,
          state_id: state,
          lga_id: lga,
          town_id: town,
          employment_status: employmentStatus,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        toast.success(
          selectedTaxpayer
            ? "Taxpayer updated successfully"
            : "Taxpayer created successfully"
        );

        setTimeout(() => {
          resetForm("");
          setShowModal(false);
          handleTaxpayer();
          setSelectedTaxpayer(null);
        }, 2000);

        setResult("");
      } else {
        toast.error(data.message);
        setResult("Save");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("No internet connection", error);
    }
  };

  const handleState = async () => {
    try {
      const res = await fetch(
        "https://water-billing-72y7.onrender.com/api/v1/states"
      );
      const data = await res.json();
      console.log(data.states);
      setStateList(data.states);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    handleState();
    handleTaxpayer();
  }, []);

  const handleLga = async (stateId) => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/lgas/lga/${stateId}`
      );

      const data = await res.json();
      console.log("LGAs fetched:", data.lgas);
      setLgaList(data.lgas);
    } catch (err) {
      console.error("Failed to fetch LGAs:", err);
    }
  };

  const handleTown = async (lgaId) => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/towns/${lgaId}`
      );
      const data = await res.json();
      console.log("Towns fetched:", data.townDetails);
      setTownList(data.townDetails);
    } catch (err) {
      console.error("Failed to fetch towns:", err);
    }
  };

  const handleTaxpayer = async () => {
    try {
      const res = await fetch(
        `https://water-billing-72y7.onrender.com/api/v1/taxpayers`
      );
      const data = await res.json();
      console.log(data.taxpayersDetails);
      setTaxpayers(data.taxpayersDetails);
      setIsLoading(false);
    } catch (err) {
      console.error("fail to retrieve taxpayers", err);
    }
  };

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

                <form className="space-y-4" onSubmit={handleSaveBtn}>
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
                      value={fullname}
                      onChange={(e) => setFullname(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        type="text"
                        id="phoneNumber"
                        className="w-full py-1 px-3  outline-blue-200 border rounded"
                        placeholder="Phone Number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                      type="text"
                      id="Address"
                      className="w-full py-1 px-3  outline-blue-200 border rounded"
                      placeholder="Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <select
                      className="flex-1 py-1 px-3 border border-gray-300   outline-blue-200 rounded text-gray-700"
                      value={state}
                      onChange={(e) => {
                        const selectedState = e.target.value;
                        setState(selectedState);
                        handleLga(selectedState);
                      }}
                    >
                      <option value="">-- Select a state --</option>
                      {stateList.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.state}
                        </option>
                      ))}
                    </select>
                    <select
                      className="flex-1 py-1 px-3 border border-gray-300   outline-blue-200 rounded text-gray-700"
                      value={lga}
                      onChange={(e) => {
                        const selectedLgaId = e.target.value;
                        setLga(selectedLgaId);
                        handleTown(selectedLgaId);
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
                      className="w-full py-1 px-3 border border-gray-300  outline-blue-200 rounded text-gray-700"
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
                      className="w-full py-1 px-3 border border-gray-300  outline-blue-200 rounded text-gray-700"
                      value={employmentStatus}
                      onChange={(e) => setEmploymentStatus(e.target.value)}
                    >
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
                    {result ? result : "Create"}
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
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Fullname
                </th>
                <th scope="col" className="px-6 py-4">
                  Phone No.
                </th>
                <th scope="col" className="px-6 py-4">
                  Email
                </th>
                <th scope="col" className="px-6 py-4">
                  State
                </th>
                <th scope="col" className="px-6 py-4">
                  Lga
                </th>
                <th scope="col" className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : taxpayers.length > 0 ? (
                taxpayers.map((taxpayer, index) => (
                  <tr
                    key={taxpayer.id || index}
                    className="border-b border-neutral-200 dark:border-white/10"
                  >
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {taxpayer.fullname}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {taxpayer.phone_number}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {taxpayer.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {taxpayer.State?.state || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {taxpayer.Lga?.lga || "N/A"}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        className="text-2xl cursor-pointer"
                        onClick={() => handleEditClick(taxpayer)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-2xl cursor-pointer"
                        type="button"
                        onClick={() => handleDeleteClick(taxpayer)}
                      >
                        <IoIosTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">
                    No taxpayers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------Delete Modal--------------------- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-md w-full text-center">
            <h1 className="text-5xl font-bold">⚠</h1>
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete {selectedTaxpayer.fullname}?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleConfirmDelete}
                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 cursor-pointer"
              >
                {deleteTaxpayer ? deleteTaxpayer : "Yes, I'm sure"}
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2.5 px-5 text-sm cursor-pointer font-medium text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 rounded-lg"
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taxpayer;
