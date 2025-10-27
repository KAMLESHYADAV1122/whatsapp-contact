import axios from "axios";

export const importContacts = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await axios.post("/api/import", formData);
  return data;
};

export const getContacts = async () => {
  const { data } = await axios.get("/api/contacts");
  return data;
};