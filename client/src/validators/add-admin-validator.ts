import { z } from "zod";

export const addAdminValidator = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(1, { message: "Please fill in the name field" }),
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
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .trim()
    .min(8, { message: "Confirm password must be atleast 8 characters long" }),
});

export type addAdminValidatorType = z.infer<typeof addAdminValidator>;
