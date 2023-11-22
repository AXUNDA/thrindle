import { Schema, model, Types } from "mongoose";

interface transaction {
  sender: Types.ObjectId;
  beneficiaryAccountNumber: string;
  amount: number;
  remarks?: string;
  beneficiaryBank: string;
  beneficiaryName: string;
}

const transactionSchema = new Schema<transaction>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    beneficiaryAccountNumber: {
      type: String,

      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    remarks: {
      type: String,
    },
    beneficiaryBank: {
      type: String,
      required: true,
    },
    beneficiaryName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = model<transaction>("Transaction", transactionSchema);

export default Transaction;
