import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      {/* Auth */}
      <Route path="/login" Component={LoginPage} />
      <Route path="/signup" Component={SignupPage} />
    </Routes>
  );
};

export default App;
