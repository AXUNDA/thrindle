import express, { Router } from "express";

import checkToken from "../middlewares/checkToken";
import walletController from "../controllers/wallet.controller";
import { transferSchema } from "../schema/transfer.schema";
import validate from "../middlewares/validate";

const router: Router = express.Router();

router.get("/banks", walletController.getAllBanks);
router.post(
  "/transfer",
  checkToken,
  validate(transferSchema),
  walletController.transfer
);
router.get("/transactions", checkToken, walletController.getTransactions);
router.get(
  "/transactions/:account_number",
  checkToken,
  walletController.getTransactionByAccountNumber
);
export default router;
