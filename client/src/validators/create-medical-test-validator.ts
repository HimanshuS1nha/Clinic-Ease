import { z } from "zod";

export const createMedicalTestValidator = z.object({
  patientId: z
    .string({ required_error: "Please select a patient" })
    .trim()
    .min(1, { message: "Please select a patient" }),
  testName: z
    .string({ required_error: "Test name is required" })
    .trim()
    .min(1, { message: "Test name is required" }),
  result: z
    .string({ required_error: "Test result is required" })
    .trim()
    .min(1, { message: "Test result is required" }),
  labName: z
    .string({ required_error: "Lab name is required" })
    .trim()
    .min(1, { message: "Lab name is required" }),
});

export type createMedicalTestValidatorType = z.infer<
  typeof createMedicalTestValidator
>;
