import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";

const DashboardWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <Navbar />
      <div className="w-full h-[92vh] flex">
        <Sidebar />

        <section
          className={cn(
            "bg-gray-100 w-full h-full flex justify-center items-center overflow-hidden",
            className
          )}
        >
          <div className="bg-white w-[95%] h-[95%] rounded-xl shadow-lg shadow-gray-300 p-6 flex flex-col gap-y-10 overflow-y-auto">
            {children}
          </div>
        </section>
      </div>
    </>
  );
};

export default DashboardWrapper;
