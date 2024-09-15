import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";

import PatientLoginPage from "./pages/auth/PatientLoginPage";
import DoctorLoginPage from "./pages/auth/DoctorLoginPage";
import SignupPage from "./pages/auth/SignupPage";

import PatientDashboardPage from "./pages/patient-dashboard/PatientDashboardPage";
import BookAppointmentPage from "./pages/patient-dashboard/BookAppointmentPage";
import AppointmentDetailsPage from "./pages/patient-dashboard/AppointmentDetailsPage";
import TestDetailsPage from "./pages/patient-dashboard/TestDetailsPage";
import AddPatientPage from "./pages/patient-dashboard/AddPatientPage";

import AdminDashboardPage from "./pages/admin-dashboard/AdminDashboardPage";
import AddAdminPage from "./pages/admin-dashboard/AddAdminPage";
import AddDoctorPage from "./pages/admin-dashboard/AddDoctorPage";
import DoctorDetailsPage from "./pages/admin-dashboard/DoctorDetailsPage";

import DoctorDashboardPage from "./pages/doctor-dashboard/DoctorDashboardPage";
import CreatePrescriptionPage from "./pages/doctor-dashboard/CreatePrescriptionPage";
import CreateMedicalTest from "./pages/doctor-dashboard/CreateMedicalTest";

import { useUser } from "./hooks/useUser";
import type { UserType } from "types";

const App = () => {
  const { setUser } = useUser();

  const { data } = useQuery({
    queryKey: ["is-logged-in"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/is-logged-in`,
        { withCredentials: true }
      );

      return data as { user: { _doc: UserType }; role?: "doctor" };
    },
  });

  useEffect(() => {
    if (data?.user._doc) {
      if (data.role) {
        setUser({ ...data.user._doc, role: data.role });
      } else {
        setUser(data.user._doc);
      }
    }
  }, [data]);
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      {/* Auth */}
      <Route path="/login/patient" Component={PatientLoginPage} />
      <Route path="/login/doctor" Component={DoctorLoginPage} />
      <Route path="/signup" Component={SignupPage} />

      {/* Patient Dashboard */}
      <Route path="/dashboard/patient" Component={PatientDashboardPage} />
      <Route path="/dashboard/patient/add-patient" Component={AddPatientPage} />
      <Route
        path="/dashboard/patient/book-appointment"
        Component={BookAppointmentPage}
      />
      <Route
        path="/dashboard/patient/appointment-details"
        Component={AppointmentDetailsPage}
      />
      <Route
        path="/dashboard/patient/test-details"
        Component={TestDetailsPage}
      />

      {/* Admin Dashboard */}
      <Route path="/dashboard/admin" Component={AdminDashboardPage} />
      <Route path="/dashboard/admin/add-admin" Component={AddAdminPage} />
      <Route path="/dashboard/admin/add-doctor" Component={AddDoctorPage} />
      <Route
        path="/dashboard/admin/doctor-details"
        Component={DoctorDetailsPage}
      />

      {/* Doctor Dashboard */}
      <Route path="/dashboard/doctor" Component={DoctorDashboardPage} />
      <Route
        path="/dashboard/doctor/create-prescription"
        Component={CreatePrescriptionPage}
      />
      <Route
        path="/dashboard/doctor/create-medical-test"
        Component={CreateMedicalTest}
      />
    </Routes>
  );
};

export default App;
