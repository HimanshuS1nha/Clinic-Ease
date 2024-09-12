import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

import PatientDashboardPage from "./pages/patient-dashboard/PatientDashboardPage";
import BookAppointmentPage from "./pages/patient-dashboard/BookAppointmentPage";
import AppointmentDetailsPage from "./pages/patient-dashboard/AppointmentDetailsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      {/* Auth */}
      <Route path="/login" Component={LoginPage} />
      <Route path="/signup" Component={SignupPage} />

      {/* Patient Dashboard */}
      <Route path="/dashboard/patient" Component={PatientDashboardPage} />
      <Route
        path="/dashboard/patient/book-appointment"
        Component={BookAppointmentPage}
      />
      <Route
        path="/dashboard/patient/appointment-details"
        Component={AppointmentDetailsPage}
      />
    </Routes>
  );
};

export default App;
