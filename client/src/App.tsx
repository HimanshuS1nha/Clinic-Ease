import { Routes, Route } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { useUser } from "./hooks/useUser";

import HomePage from "./pages/HomePage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

import PatientDashboardPage from "./pages/patient-dashboard/PatientDashboardPage";
import BookAppointmentPage from "./pages/patient-dashboard/BookAppointmentPage";
import AppointmentDetailsPage from "./pages/patient-dashboard/AppointmentDetailsPage";
import TestDetailsPage from "./pages/patient-dashboard/TestDetailsPage";
import AddPatientPage from "./pages/patient-dashboard/AddPatientPage";

import AddAdminPage from "./pages/admin-dashboard/AddAdminPage";

import type { UserType } from "types";
import { useEffect } from "react";
import AddDoctorPage from "./pages/admin-dashboard/AddDoctorPage";

const App = () => {
  const { setUser } = useUser();

  const { data } = useQuery({
    queryKey: ["is-logged-in"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/is-logged-in`,
        { withCredentials: true }
      );

      return data as { user: { _doc: UserType } };
    },
  });

  useEffect(() => {
    if (data?.user._doc) {
      setUser(data.user._doc);
    }
  }, [data]);
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      {/* Auth */}
      <Route path="/login" Component={LoginPage} />
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
      <Route path="/dashboard/admin/add-admin" Component={AddAdminPage} />
      <Route path="/dashboard/admin/add-doctor" Component={AddDoctorPage} />
    </Routes>
  );
};

export default App;
