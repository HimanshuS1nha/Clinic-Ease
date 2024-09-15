import { z } from "zod";

export const createPrescriptionValidator = z.object({
  patientId: z
    .string({ required_error: "Please select a patient" })
    .trim()
    .min(1, { message: "Please select a patient" }),
  medicine: z
    .string({ required_error: "Medicine is required" })
    .trim()
    .min(1, { message: "Medicine is required" }),
  dosage: z
    .string({ required_error: "Dosage is required" })
    .trim()
    .min(1, { message: "Dosage is required" }),
});

export type createPrescriptionValidatorType = z.infer<
  typeof createPrescriptionValidator
>;
