import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-2xl font-bold text-emerald-600">{children}</p>
      <div className="w-full h-0.5 bg-gray-300" />
    </div>
  );
};

export default Title;
