import CustomError from "../errors/custom_error";
import { Types } from "mongoose";
import flutterwave from "../lib/flutterwave";
import { transferDto } from "../dto/transfer.dto";
import Transaction from "../db/transaction.model";

export default {
  //   async createWallet(userId: string) {
  //     try {
  //       const wallet = await Wallet.create({
  //         user: userId,
  //         balance: 5000,
  //       });
  //       return wallet.toJSON();
  //     } catch (error) {
  //       throw new CustomError("unable to create wallet", 500);
  //     }
  //   },
  //   async getWallet(userId: Types.ObjectId) {
  //     try {
  //       const wallet = await Wallet.findOne({ user: userId });
  //       return wallet;
  //     } catch (error) {
  //       throw new CustomError("unable to fetch wallet", 500);
  //     }
  //   },

  async transfer(dto: transferDto) {
    try {
      const data = await flutterwave.transfer(dto);
      await Transaction.create({
        sender: dto.sender,
        beneficiaryAccountNumber: dto.account_number,
        beneficiaryBank: data.data.bank_name,
        amount: dto.amount,
        remarks: dto.narration,
        beneficiaryName: data.data.full_name,
      });
      return data;
    } catch (error) {
      console.log(error);
      throw new CustomError("unable to initiate transfer", 500);
    }
  },
  async getAllBanks() {
    try {
      const banks = await flutterwave.getAllBanks();
      return banks;
    } catch (error) {
      throw new CustomError("unable to fetch banks", 500);
    }
  },
  async getTransactionHistory(user: string) {
    try {
      const transactions = await Transaction.find({
        sender: user,
      });
      return transactions;
    } catch (error) {
      throw new CustomError("unable to fetch transactions", 500);
    }
  },
  async getTransactionsByAccountNumber(beneficiaryAccountNumber: string) {
    try {
      const transactions = await Transaction.find({
        beneficiaryAccountNumber,
      });
      return transactions;
    } catch (error) {
      throw new CustomError("unable to fetch transactions", 500);
    }
  },
};
