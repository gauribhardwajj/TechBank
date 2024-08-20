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

  if (method === "POST") {
    try {
      const { name, email, currentBalance } = req.body;
      validateAllOnce({
        name,
        email,
        currentBalance,
      });

      const user = await User.create(req.body);
      responseHandler(user, res);
    } catch (error) {
      errorHandler(error, res);
    }
  } else {
    errorHandler("Invalid request type", res);
  }
}
