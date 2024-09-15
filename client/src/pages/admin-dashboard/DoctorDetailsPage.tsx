import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";

type DoctorDetails = {
  _id: string;
  name: string;
  email: string;
  doctorType: string;
};

const DoctorDetailsPage = () => {
  const columns: ColumnDef<DoctorDetails>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "doctorType",
      header: "Doctor Type",
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-doctors-details"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/doctors`
      );

      return data as DoctorDetails[];
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }
  return (
    <DashboardWrapper>
      <Title>Doctor Details</Title>

      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      )}

      {data && <DataTable columns={columns} data={data} />}
    </DashboardWrapper>
  );
};

export default DoctorDetailsPage;
