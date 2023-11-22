import { object, string, number } from "zod";

export const transferSchema = object({
  body: object({
    account_bank: string({
      required_error: "account_bank is required",
    }),

    account_number: string({
      required_error: "account_number is required",
    }).min(10, "account number is too short must be 10 characters minimum"),

    amount: number({
      required_error: "amount  is required",
    })
      .positive()
      .refine((val) => val !== 0, {
        message: "amount must be a positive non-zero value",
      }),
    narration: string({
      required_error: "narration  is required",
    }),
  }),
});
