import { useQuery } from "@tanstack/react-query";
// import axios, { AxiosError } from "axios";
// import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";

type AppointmentDetails = {
  id: string;
  patientName: string;
  date: string;
};

const AppointmentsListPage = () => {
  const columns: ColumnDef<AppointmentDetails>[] = [
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
    queryKey: ["get-appointments-list"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(() => resolve(""), 2000));
      const data: AppointmentDetails[] = [
        {
          id: "1",
          patientName: "Patient 2",
          date: "2024-09-25",
        },
      ];
      return data;
    },
  });
  return (
    <DashboardWrapper>
      <Title>Appointments List</Title>

      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      )}

      {data && <DataTable columns={columns} data={data} />}
    </DashboardWrapper>
  );
};

export default AppointmentsListPage;
