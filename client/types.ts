export type UserType = {
  _id: string;
  email: string;
  mobile: string;
  role: "patient" | "admin" | "doctor";
};

export type PatientType = {
  _id: string;
  name: string;
  age: number;
  gender: string;
};
