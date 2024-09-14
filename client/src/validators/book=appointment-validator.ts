import { z } from "zod";

export const bookAppointmentValidator = z.object({
  doctorId: z
    .string({ required_error: "Please select a doctor" })
    .trim()
    .min(1, { message: "Please select a doctor" }),
  patientId: z
    .string({ required_error: "Please select a patient" })
    .trim()
    .min(1, { message: "Please select a patient" }),
  date: z.date(),
});

export type bookAppointmentValidatorType = z.infer<
  typeof bookAppointmentValidator
>;
