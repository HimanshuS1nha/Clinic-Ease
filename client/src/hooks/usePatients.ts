import { PatientType } from "types";
import { create } from "zustand";

type UsePatientsType = {
  patients: PatientType[];
  setPatients: (patients: PatientType[]) => void;
};

export const usePatients = create<UsePatientsType>((set) => ({
  patients: [],
  setPatients: (patients) => set({ patients }),
}));
