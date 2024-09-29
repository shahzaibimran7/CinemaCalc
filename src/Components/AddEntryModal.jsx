import React, { useState } from "react";

export default function AddEntryModal({ showModal, setShowModal, onAddEntry }) {
  const [newEntry, setNewEntry] = useState({
    name: "",
    price: "",
    percentageMarkup: "",
  });
  const [errors, setErrors] = useState({});

  const handleNewEntryChange = (e) => {
    const { name, value } = e.target;
    setNewEntry({ ...newEntry, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!newEntry.name.trim()) formErrors.name = "Name is required";
    if (!newEntry.price || newEntry.price <= 0)
      formErrors.price = "Valid price is required";
    if (!newEntry.percentageMarkup || newEntry.percentageMarkup < 0)
      formErrors.percentageMarkup = "Valid percentage Markup is required";
    setErrors(formErrors);
    return formErrors;
  };

  const handleAddEntry = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      onAddEntry(newEntry);
      setNewEntry({ name: "", price: "", percentageMarkup: "" });
      setErrors({});
      setShowModal(false);
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h2 className="text-xl font-bold mb-4">Add New Entry</h2>

        <div className="mb-4">
          <label className="block mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={newEntry.name}
            onChange={handleNewEntryChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={newEntry.price}
            onChange={handleNewEntryChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.price ? "border-red-500" : ""
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2">Percentage Markup</label>
          <input
            type="number"
            name="percentageMarkup"
            value={newEntry.percentageMarkup}
            onChange={handleNewEntryChange}
            className={`w-full border rounded px-3 py-2 ${
              errors.markup ? "border-red-500" : ""
            }`}
          />
          {errors.percentageMarkup && (
            <p className="text-red-500 text-sm">{errors.percentageMarkup}</p>
          )}
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setShowModal(false);
              setNewEntry({ name: "", price: "", percentageMarkup: "" });
              setErrors({});
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleAddEntry}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
