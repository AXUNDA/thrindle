import { omit } from "lodash";
import User, { IUser } from "../db/user.model";
import CustomError from "../errors/custom_error";
import jwtService from "./jwt.service";
import * as argon from "argon2";
import { loginDto } from "../dto/login.dto";
import cacheService from "./cache.service";
import sms from "../lib/sms";
import { changePassword } from "../dto/changePassword.dto";
import { changePhone } from "../dto/changePhone.dto";

export default {
  async signUp(dto: IUser) {
    try {
      const hash = await argon.hash(dto.password);
      dto.password = hash;
      const data = await User.create(dto);
      const user = this.cleanup(data);
      const token = await jwtService.sign(user);
      return {
        token,
        user,
      };
    } catch (error: any) {
      if (error.code == "11000") {
        throw new CustomError("user already exists", 409);
      } else {
        throw new CustomError(error.message, 500);
      }
    }
  },
  async login(dto: loginDto) {
    const user = await User.findOne({
      phone: dto.phone,
    });
    if (!user) throw new CustomError("no user with this email", 404);
    const status = await argon.verify(user!.password, dto.password);
    if (!status) throw new CustomError("invalid credentials", 401);
    const cleaned_data = this.cleanup(user);
    const token = await jwtService.sign(cleaned_data);
    return {
      data: { ...cleaned_data },
      token,
    };
  },
  async sendRegistrationOtp(dto: IUser) {
    const otp = this.generateRandomString();
    try {
      await sms.sendSms(dto.phone, `your otp is ${otp}`);
      await cacheService.set(otp, dto, 5000);
      return {
        status: "otp sent",
      };
    } catch (error) {
      console.log(error);
    }
  },
  async updatePassword(dto: changePassword) {
    try {
      const password = await argon.hash(dto.password);
      await User.findByIdAndUpdate(dto.id, {
        password,
      });
      return;
    } catch (error: any) {
      throw new CustomError("an error occurred", 500);
    }
  },
  async updatePhoneNumber(dto: changePhone) {
    try {
      await User.findByIdAndUpdate(dto.id, {
        phone: dto.phone,
      });
      return;
    } catch (error) {
      throw new CustomError("an error occurred", 500);
    }
  },
  async sendOtp(to: string, body: string) {
    return await sms.sendSms(to, body);
  },

  cleanup(dto: any) {
    const data = omit(dto!.toJSON(), "password");
    return data;
  },
  generateRandomString() {
    const charset =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let randomString = "";

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset.charAt(randomIndex);
    }

    return randomString;
  },
};
