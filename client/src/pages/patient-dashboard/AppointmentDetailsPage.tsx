import { ColumnDef } from "@tanstack/react-table";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";

type AppointmentDetails = {
  id: string;
  doctorName: string;
  date: string;
};

const AppointmentDetailsPage = () => {
  const columns: ColumnDef<AppointmentDetails>[] = [
    {
      accessorKey: "doctorName",
      header: "Doctor Name",
    },
    {
      accessorKey: "date",
      header: "Date",
    },
  ];

  const data = [
    {
      id: "1",
      doctorName: "ABC",
      date: "Sept 12, 2024",
    },
    {
      id: "2",
      doctorName: "DEF",
      date: "Sept 24, 2024",
    },
  ];
  return (
    <DashboardWrapper className="">
      <Title>Appointment Details</Title>

      <DataTable columns={columns} data={data} />
    </DashboardWrapper>
  );
};

export default AppointmentDetailsPage;
