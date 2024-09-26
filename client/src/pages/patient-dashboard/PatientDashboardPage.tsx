import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import { useUser } from "@/hooks/useUser";

const PatientDashboardPage = () => {
  const { user } = useUser();
  return (
    <DashboardWrapper>
      <div className="flex justify-center items-center w-full h-full">
        <p className="text-2xl text-emerald-600 font-bold text-center">
          Welcome User {user?.email}!
        </p>
      </div>
    </DashboardWrapper>
  );
};

export default PatientDashboardPage;
