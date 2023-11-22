import { Request, Response, NextFunction } from "express";
import WalletService from "../services/Wallet.service";

export default {
  async getAllBanks(req: Request, res: Response, next: NextFunction) {
    try {
      const banks = await WalletService.getAllBanks();
      return res.status(200).json(banks);
    } catch (error) {
      next(error);
    }
  },
  async transfer(req: Request, res: Response, next: NextFunction) {
    try {
      req.body.sender = res.locals.user._id;

      const data = await WalletService.transfer(req.body);
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async getTransaction(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await WalletService.getTransactionHistory(
        res.locals.user._id
      );
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
  async getTransactionByAccountNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await WalletService.getTransactionsByAccountNumber(
        req.params.account_number
      );
      return res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  },
};
