import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
dotenv.config();
import { transferDto } from "../dto/transfer.dto";

const key = process.env.key as string;

class FlutterWave {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: "https://api.flutterwave.com/v3",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
    });
  }
  async getAllBanks() {
    try {
      const banks = await this.client.get("/banks/NG");

      return banks.data;
    } catch (error: any) {
      console.log(error.message);
      throw error;
    }
  }
  async transfer(dto: transferDto) {
    try {
      const data = await this.client.post("/transfers", {
        ...dto,
        currency: "NGN",
      });
      return data.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new FlutterWave();
