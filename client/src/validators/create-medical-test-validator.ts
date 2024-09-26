import { z } from "zod";

export const createMedicalTestValidator = z.object({
  patientId: z
    .string({ required_error: "Please select a patient" })
    .trim()
    .min(1, { message: "Please select a patient" }),
  testNames: z
    .array(z.string().trim().min(1, { message: "Please fill all the fields" }))
    .nonempty(),
  testResults: z
    .array(z.string().trim().min(1, { message: "Please fill all the fields" }))
    .nonempty(),
  labName: z
    .string({ required_error: "Lab name is required" })
    .trim()
    .min(1, { message: "Lab name is required" }),
});

export type createMedicalTestValidatorType = z.infer<
  typeof createMedicalTestValidator
>;
