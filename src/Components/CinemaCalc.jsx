import React, { useState, useEffect } from "react";
import {
  getEntries,
  addEntry,
  editEntry,
  removeEntry,
} from "../Services/CinemaCalcAPIServices";
import AddEntryModal from "./AddEntryModal";
export default function CinemaCalc() {
  const [entries, setEntries] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [newEntry, setNewEntry] = useState({
    name: "",
    price: "",
    percentageMarkup: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await getEntries();
        if (response?.data?.data?.expenses?.length) {
          setEntries([...response.data.data.expenses]);
          setTotalSum(response.data.data.totalSum);
        } else {
          console.error("No expenses found");
          setError("No entries found.");
        }
      } catch (error) {
        console.error("Error fetching entries:", error);
        setError("Failed to fetch entries.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntries();
  }, []);

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = async (id) => {
    try {
      const entryToUpdate = entries.find((entry) => entry.expenseId === id);

      if (entryToUpdate) {
        const updatedEntry = {
          ...entryToUpdate,
          totalPrice: (
            Number(entryToUpdate.price) +
            (Number(entryToUpdate.price) *
              Number(entryToUpdate.percentageMarkup)) /
              100
          ).toFixed(2),
        };
        await editEntry({ id, payload: updatedEntry });
        const updatedEntries = entries.map((entry) =>
          entry.expenseId === id ? updatedEntry : entry
        );
        setEntries(updatedEntries);
        const newTotal = updatedEntries.reduce(
          (sum, entry) => sum + parseFloat(entry.totalPrice || 0),
          0
        );
        setTotalSum(newTotal.toFixed(2));
        setEditingId(null);
      } else {
        console.error(`Entry with id ${id} not found`);
      }
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const entryToDelete = entries.find((entry) => entry.expenseId === id);

      if (entryToDelete) {
        await removeEntry({ id });
        const updatedEntries = entries.filter(
          (entry) => entry.expenseId !== id
        );
        setEntries(updatedEntries);
        setTotalSum((prevTotalSum) =>
          (prevTotalSum - Number(entryToDelete.totalPrice)).toFixed(2)
        );
      } else {
        console.error(`Entry with id ${id} not found`);
      }
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  const handleInputChange = (e, id, field) => {
    const updatedEntries = entries.map((entry) =>
      entry.expenseId === id ? { ...entry, [field]: e.target.value } : entry
    );
    setEntries(updatedEntries);
  };

  const handleAddEntry = async () => {
    const totalPrice = (
      Number(newEntry.price) +
      (Number(newEntry.price) * Number(newEntry.markup)) / 100
    ).toFixed(2);
    const entryToAdd = {
      name: newEntry.name,
      price: newEntry.price,
      percentageMarkup: newEntry.percentageMarkup,
      totalPrice,
    };
    const addedEntry = await addEntry({ payload: entryToAdd });
    setEntries([...entries, entryToAdd]);
    setTotalSum(totalSum + totalPrice);

    setNewEntry({ name: "", price: "", percentageMarkup: "" });
    setShowModal(false);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Expense Calculator</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        Add Another Entry
      </button>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
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
            {entries?.length > 0 ? (
              entries?.map((entry) => (
                <tr key={entry.expenseId} className="border-t">
                  <td className="px-4 py-2">
                    {editingId === entry.expenseId ? (
                      <input
                        type="text"
                        value={entry.name}
                        onChange={(e) =>
                          handleInputChange(e, entry.expenseId, "name")
                        }
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      entry.name
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === entry.expenseId ? (
                      <input
                        type="number"
                        value={entry.price}
                        onChange={(e) =>
                          handleInputChange(e, entry.expenseId, "price")
                        }
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      `$${entry.price}`
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === entry.expenseId ? (
                      <input
                        type="number"
                        value={entry.percentageMarkup}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            entry.expenseId,
                            "percentageMarkup"
                          )
                        }
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      `${entry.percentageMarkup}%`
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === entry.expenseId ? (
                      <input
                        type="text"
                        value={(
                          Number(entry.price) +
                          (Number(entry.price) *
                            Number(entry.percentageMarkup)) /
                            100
                        ).toFixed(2)}
                        readOnly
                        className="border rounded px-2 py-1"
                      />
                    ) : (
                      `$${entry.totalPrice}`
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingId === entry.expenseId ? (
                      <button
                        onClick={() => handleSave(entry.expenseId)}
                        className="bg-green-500 text-white px-2 py-1 rounded-md"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(entry.expenseId)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(entry.expenseId)}
                      className="bg-red-500 text-white px-2 py-1 ml-2 rounded-md"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No entries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <div className="mt-4 text-xl font-bold">Total Expense: ${totalSum}</div>

      <AddEntryModal
        showModal={showModal}
        setShowModal={setShowModal}
        onAddEntry={handleAddEntry}
      />
    </div>
  );
}
