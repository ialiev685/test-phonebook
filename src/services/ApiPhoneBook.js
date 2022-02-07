const axios = require("axios");

// const API = axios.create({
//   baseURL: "https://connections-api.herokuapp.com",
// });

axios.defaults.baseURL = "https://connections-api.herokuapp.com";

const token = {
  set(token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common["Authorization"] = "";
  },
};

//запросы по контактам

export const fetchContacts = async (localStorage) => {
  token.set(localStorage);
  return await axios.get("/contacts");
};

export const fetchCreateContact = async (item) => {
  return await axios.post("/contacts", item);
};

export const fetchDeleteContact = async (id) => {
  return await axios.delete(`/contacts/${id}`);
};

export const fetchUpdateContact = async ({ id, name, number }) => {
  return await axios.patch(`/contacts/${id}`, { name, number });
};

//запросы авторизации

export const fetchRegisterUser = async (user) => {
  const { data } = await axios.post("/users/signup", user);
  token.set(data.token);
  return data;
};

export const fetchLogInUser = async (user) => {
  const { data } = await axios.post("/users/login", user);

  token.set(data.token);

  return data;
};

export const fetchLogOut = async () => {
  await axios.post("/users/logout");
  token.unset();
};

export const fetchCurrentUser = async (localStorage) => {
  token.set(localStorage);

  const { data } = await axios.get("/users/current");

  return data;
};

const API = {
  fetchContacts,
  fetchCreateContact,
  fetchDeleteContact,
  fetchUpdateContact,
  fetchRegisterUser,
  fetchLogInUser,
  fetchLogOut,
  fetchCurrentUser,
};

export default API;
