import axios from "axios";
import React, { useState, useEffect } from "react";

export default function CinemaCalc() {
  const [entries, setEntries] = useState([
    { id: 1, name: "Movie A", price: 10, markup: 20, total: 12 },
    { id: 2, name: "Movie B", price: 15, markup: 15, total: 17.25 },
  ]);
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState({ name: "", price: "", markup: "" });
  const [showModal, setShowModal] = useState(false);
  const [apiCheck, setApiCheck] = useState([]);
  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleInputChange = (e, id, field) => {
    const updatedEntries = entries.map((entry) =>
      entry.id === id ? { ...entry, [field]: e.target.value } : entry
    );
    setEntries(updatedEntries);
  };

  const handleNewEntryChange = (e) => {
    setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
  };

  const handleAddEntry = () => {
    const total = (
      Number(newEntry.price) +
      (Number(newEntry.price) * Number(newEntry.markup)) / 100
    ).toFixed(2);
    const newId = entries.length ? entries[entries.length - 1].id + 1 : 1;
    setEntries([
      ...entries,
      {
        id: newId,
        name: newEntry.name,
        price: newEntry.price,
        markup: newEntry.markup,
        total,
      },
    ]);
    setNewEntry({ name: "", price: "", markup: "" });
    setShowModal(false);
  };
  const totalExpense = entries
    .reduce((acc, entry) => acc + Number(entry.total), 0)
    .toFixed(2);
  const getEntries = async () => {
    const datas = await axios.get("http://localhost:5084/api/Expenses");
    setApiCheck(datas?.data);
    const finalData = datas?.data;
    return finalData;
  };
  useEffect(() => {
    getEntries();
  }, []);
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4"> Expense Calculator</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Another Entry
      </button>

      <table className="table-auto w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Percentage Markup</th>
            <th className="px-4 py-2">Total Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id} className="border-t">
              <td className="px-4 py-2">
                {editingId === entry.id ? (
                  <input
                    type="text"
                    value={entry.name}
                    onChange={(e) => handleInputChange(e, entry.id, "name")}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  entry.name
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={entry.price}
                    onChange={(e) => handleInputChange(e, entry.id, "price")}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  `$${entry.price}`
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === entry.id ? (
                  <input
                    type="number"
                    value={entry.markup}
                    onChange={(e) => handleInputChange(e, entry.id, "markup")}
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  `${entry.markup}%`
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === entry.id ? (
                  <input
                    type="text"
                    value={(
                      Number(entry.price) +
                      (Number(entry.price) * Number(entry.markup)) / 100
                    ).toFixed(2)}
                    readOnly
                    className="border rounded px-2 py-1"
                  />
                ) : (
                  `$${entry.total}`
                )}
              </td>
              <td className="px-4 py-2">
                {editingId === entry.id ? (
                  <button
                    onClick={() => handleSave(entry.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded-md"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(entry.id)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="bg-red-500 text-white px-2 py-1 ml-2 rounded-md"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-xl font-bold">
        Total Expense: ${totalExpense}
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-bold mb-4">Add New Entry</h2>
            <div className="mb-4">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={newEntry.name}
                onChange={handleNewEntryChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={newEntry.price}
                onChange={handleNewEntryChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Percentage Markup</label>
              <input
                type="number"
                name="markup"
                value={newEntry.markup}
                onChange={handleNewEntryChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
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
      )}
    </div>
  );
}
