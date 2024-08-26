import User from "../../../models/User";
import {
  errorHandler,
  responseHandler,
  validateAllOnce,
} from "../../../utils/common";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  const { method } = req;

  try {
    dbConnect(); // Ensure database connection is established

    if (method === "GET") {
      const users = await User.aggregate([
        { $match: {} },
        { $sort: { createdAt: -1 } },
      ]);

      return res.status(200).json(users); // Return users data
    } else {
      return res.status(405).json({ error: "Method not allowed" }); // Handle invalid methods
    }
  } catch (error) {
    console.error("Error in API handler:", error.message); // Log detailed error message
    return res.status(500).json({ error: "Internal Server Error" }); // Return server error
  }
}
