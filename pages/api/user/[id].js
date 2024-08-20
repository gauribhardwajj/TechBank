import User from "../../../models/User";
import { errorHandler, responseHandler } from "../../../utils/common";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "PUT") {
    try {
      const user = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      responseHandler(user, res);
    } catch (error) {
      errorHandler("User not found", res);
    }
  } else if (method === "GET") {
    try {
      const user = await User.findById(id);
      responseHandler(user, res);
    } catch (error) {
      errorHandler(error, res);
    }
  } else if (method === "DELETE") {
    try {
      const user = await User.findByIdAndDelete(id);
      responseHandler("Account has been deleted successfully", res);
    } catch (error) {
      errorHandler(error, res);
    }
  } else {
    errorHandler("Invalid request type", res);
  }
}
