import axios from "axios";
import { URL } from "../env";

const instance = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
