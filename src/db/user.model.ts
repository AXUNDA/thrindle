import { Schema, model } from "mongoose";

interface IUser {
  name?: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: false },

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
export { IUser };
