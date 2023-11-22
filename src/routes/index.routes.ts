import express, { Router } from "express";
import auth from "./auth.routes";
import wallet from "./wallet.routes";

const router: Router = express.Router();

router.use("/auth", auth);
router.use("/wallet", wallet);
router.get("/", (req, res) => {
  res.send("hello world");
});

export default router;
