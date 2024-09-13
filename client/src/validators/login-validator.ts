import { z } from "zod";

export const loginValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  phoneNumber: z
    .string({ required_error: "Phone Number is required" })
    .trim()
    .length(10, { message: "Phone Number must be 10 digits long" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
});

export type loginValidatorType = z.infer<typeof loginValidator>;
