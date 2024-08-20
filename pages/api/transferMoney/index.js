import User from "../../../models/User";
import {
  errorHandler,
  hasOnlyNumbers,
  responseHandler,
  validateAllOnce,
} from "../../../utils/common";
import dbConnect from "../../../utils/mongo";

export default async function handler(req, res) {
  const { method } = req;

  dbConnect();

  if (method === "PUT") {
    try {
      const { fromUser, toUser, amount } = req.body;
      validateAllOnce({
        fromUser,
        toUser,
      });
      hasOnlyNumbers(amount);

      const fromUserData = await User.findById(fromUser);
      const toUserData = await User.findById(toUser);
      if (fromUserData.currentBalance < Number(amount)) {
        throw new Error("insufficient balance");
      }

      await User.findByIdAndUpdate(fromUser, {
        currentBalance: fromUserData.currentBalance - Number(amount),
      });
      await User.findByIdAndUpdate(toUser, {
        currentBalance: toUserData.currentBalance + Number(amount),
      });

      responseHandler({ message: "Money transfered Successfully" }, res);
    } catch (error) {
      errorHandler(error, res);
    }
  } else {
    errorHandler("Invalid request type", res);
  }
}
