import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";

type AppointmentDetails = {
  id: string;
  doctorName: string;
  patientName: string;
  date: string;
};

const AppointmentDetailsPage = () => {
  const columns: ColumnDef<AppointmentDetails>[] = [
    {
      accessorKey: "doctorName",
      header: "Doctor Name",
    },
    {
      accessorKey: "patientName",
      header: "Patient Name",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
  ];

  const { data, isLoading } = useQuery({
    queryKey: ["get-appointments"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/appointments`,
        { withCredentials: true }
      );

      return data as AppointmentDetails[];
    },
  });
  return (
    <DashboardWrapper className="">
      <Title>Appointment Details</Title>

      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      )}

      {data && <DataTable columns={columns} data={data} />}
    </DashboardWrapper>
  );
};

export default AppointmentDetailsPage;
