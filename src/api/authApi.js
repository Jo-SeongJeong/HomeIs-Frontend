import axios from "axios";

const authApi = axios.create({
  baseURL: "http://localhost:80/homeis/user",
});

export default authApi;
