import { z } from "zod";

export const addPatientValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Please fill in the name field" }),
  age: z
    .string({ required_error: "Age is required" })
    .trim()
    .min(1, { message: "Please fill in the age field" }),
  gender: z
    .string({ required_error: "Gender is required" })
    .trim()
    .min(1, { message: "Please select a gender" }),
});

export type addPatientValidatorType = z.infer<typeof addPatientValidator>;
