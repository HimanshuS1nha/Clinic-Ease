import { z } from "zod";

export const addDoctorValidator = z.object({
  name: z
    .string({ required_error: "name is required" })
    .trim()
    .min(1, { message: "Please fill in the name field" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  doctorType: z
    .string({ required_error: "Doctor Type is required" })
    .trim()
    .min(1, { message: "Doctor Type is required" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .trim()
    .min(8, { message: "Confirm password must be atleast 8 characters long" }),
});

export type addDoctorValidatorType=z.infer<typeof addDoctorValidator>
