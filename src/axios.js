import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9000/api/",
  baseURL: "https://todo-app-dav.herokuapp.com/api/",
});

export default instance;
