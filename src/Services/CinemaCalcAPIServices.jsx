import axios from "axios";
export const getEntries = async () => {
  const tableEntryData = await axios.get("http://localhost:5084/api/Expenses");
  return tableEntryData;
};
export const addEntry = async ({ payload }) => {
  const tableEntryData = await axios.post(
    "http://localhost:5084/api/Expenses",
    payload
  );
  return tableEntryData;
};
export const editEntry = async ({ id, payload }) => {
  const tableEntryData = await axios.put(
    `http://localhost:5084/api/Expenses/${id}`,
    payload
  );
  return tableEntryData;
};
export const removeEntry = async ({ id }) => {
  const tableEntryData = await axios.delete(
    `http://localhost:5084/api/Expenses/${id}`
  );
  return tableEntryData;
};
