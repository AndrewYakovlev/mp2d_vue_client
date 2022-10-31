import axios from "axios";
const baseUrl = "http://localhost/api/accounts/";

const save = async (data) => {
  return axios.post(baseUrl + "save", data);
};

const get = (type) => {
  return axios.get(baseUrl + "get", { params: type });
};

const remove = (id) => {
  return axios.delete(baseUrl + "remove/" + id);
};

export default {
  save,
  get,
  remove,
};
