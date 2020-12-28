import axios from "axios";
import  config from "../config";

const baseURL = config.baseURL;

if (process.env.NODE_ENV === "development") {
  console.log("baseURL: ", baseURL);
}

export default axios.create({ baseURL });
