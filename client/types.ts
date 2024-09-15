export type UserType = {
  _id: string;
  email: string;
  mobile: string;
  role: "patient" | "admin" | "doctor";
};
