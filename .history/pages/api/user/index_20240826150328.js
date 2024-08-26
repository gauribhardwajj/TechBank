import User from "../../../models/User";
import {
  errorHandler,
  responseHandler,
  validateAllOnce,
} from "../../../utils/common";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const users = await User.aggregate([
        {
          $match: {},
        },
        { $sort: { createdAt: -1 } },
      ]);

      responseHandler(users, res);
    } catch (error) {
      errorHandler(error, res);
    }
  } else {
    errorHandler("Invalid request type", res);
  }
}
