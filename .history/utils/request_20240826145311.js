import axios from "axios";
import { server } from "../config";
import { getValue } from "./common";

export const createuser = async (payload) => {
  try {
    const res = await axios.post("/api/signup", payload);
    return res.data;
  } catch (error) {
    const errorMsg = getValue(error, ["response", "data"]);
    if (typeof errorMsg.errorMessage === "object") {
      if (
        errorMsg.errorMessage.code === 11000 &&
        "username" in errorMsg.errorMessage.keyValue
      ) {
        return { hasError: true, errorMessage: "Username already exists" };
      }
      if (
        errorMsg.errorMessage.code === 11000 &&
        "email" in errorMsg.errorMessage.keyValue
      ) {
        return { hasError: true, errorMessage: "Email already exists" };
      }
      return { hasError: true, errorMessage: "Invalid data" };
    }
    return errorMsg;
  }
};

export const getusers = async () => {
  try {
    const res = await axios.get(`${server}/api/user`);
    console.log("Data fetched successfully:", res.data); // Log data for debugging
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error); // Log error details
    const errorMsg = getValue(error, ["response", "data"]);
    return errorMsg;
  }
};

export const getuser = async (id) => {
  try {
    const res = await axios.get(`${server}/api/user/${id}`);
    return res.data;
  } catch (error) {
    const errorMsg = getValue(error, ["response", "data"]);
    return errorMsg;
  }
};

export const sendmoney = async (payload) => {
  try {
    const res = await axios.put(`${server}/api/transferMoney`, payload);
    return res.data;
  } catch (error) {
    const errorMsg = getValue(error, ["response", "data"]);
    return errorMsg;
  }
};
