import { Schema, model } from "mongoose";

enum defaultUserType {
  client = "client",
  vendor = "vendor",
  rider = "rider",
}

interface IUser {
  name?: string;
  email: string;
  password: string;

  avi?: string;
  phone: string;
  defaultUserType: defaultUserType;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: false },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    phone: {
      type: String,
    },
    avi: {
      type: String,
      required: false,
    },
    defaultUserType: {
      type: String,
      enum: ["vendor", "client", "user"],
    },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
export { IUser };
