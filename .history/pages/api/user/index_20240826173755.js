import User from "../../../models/User";
import {
  errorHandler,
  responseHandler,
  validateAllOnce,
} from "../../../utils/common";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  const { method } = req;

  console.log("Received request with method:", method);

  dbConnect();

  if (method === "GET") {
    try {
      console.log("Attempting to fetch users...");
      const users = await User.aggregate([
        {
          $match: {},
        },
        { $sort: { createdAt: -1 } },
      ]);

      console.log("Users fetched:", users);
      responseHandler(users, res);
    } catch (error) {
      console.error("Error occurred:", error);
      errorHandler(error, res);
    }
  } else {
    errorHandler("Invalid request type", res);
  }
}
