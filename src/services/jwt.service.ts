import jwt from "jsonwebtoken";
import CustomError from "../errors/custom_error";

export default {
  async sign(data: any) {
    try {
      return await jwt.sign(data, process.env.jwt_key as string, {
        expiresIn: "3d",
      });
    } catch (error: any) {
      console.log(error);
      throw new CustomError(error.message, 409);
    }
  },

  async verify(token: string) {
    try {
      return await jwt.verify(token, process.env.jwt_key as string);
    } catch (error: any) {
      throw new CustomError("un-authorized", 409);
    }
  },
};
