import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="w-full h-[92vh] flex">
        <Sidebar />

        <div className="bg-gray-100 w-full h-full">{children}</div>
      </div>
    </>
  );
};

export default DashboardWrapper;
