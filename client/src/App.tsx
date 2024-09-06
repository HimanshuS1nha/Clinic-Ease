import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";

import LoginPage from "./pages/auth/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" Component={HomePage} />

      {/* Auth */}
      <Route path="/login" Component={LoginPage} />
    </Routes>
  );
};

export default App;
