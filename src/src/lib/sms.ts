import axios, { AxiosInstance } from "axios";
import CustomError from "../errors/custom_error";

class Sms {
  private client: AxiosInstance;
  constructor() {
    this.client = axios.create({
      baseURL: "https://www.bulksmsnigeria.com/api/v1",
    });
  }
  async sendSms(to: string, body: string) {
    try {
      this.client.post("/sms/create", {
        from: "lopserv",
        to,
        body,
        api_token: process.env.bulkSms_token,
      });
    } catch (error: any) {
      console.log(error);
      throw new CustomError(error.message, 500);
    }
  }
}

export default new Sms();
