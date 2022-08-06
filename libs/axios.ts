import axios from "axios";

const instance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

export default instance;
