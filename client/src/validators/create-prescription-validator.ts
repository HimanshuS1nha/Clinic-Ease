import { z } from "zod";

export const createPrescriptionValidator = z.object({
  patientId: z
    .string({ required_error: "Please select a patient" })
    .trim()
    .min(1, { message: "Please select a patient" }),
  medicines: z
    .array(z.string().trim().min(1, { message: "Please fill all the fields" }))
    .nonempty(),
  dosages: z
    .array(z.string().trim().min(1, { message: "Please fill all the fields" }))
    .nonempty(),
});

export type createPrescriptionValidatorType = z.infer<
  typeof createPrescriptionValidator
>;
