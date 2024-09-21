import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";

type PrescriptionDetails = {
  id: string;
  patientName: string;
  medicine: string;
  dosage: string;
  createdAt: string; // You can format this as needed
};

const PrescriptionDetailsPage = () => {
  const columns: ColumnDef<PrescriptionDetails>[] = [
    {
      accessorKey: "patientName",
      header: "Patient Name",
    },
    {
      accessorKey: "medicine",
      header: "Medicine",
    },
    {
      accessorKey: "dosage",
      header: "Dosage",
    },
    {
      accessorKey: "createdAt",
      header: "Date Prescribed",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-prescriptions"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/prescription`, 
        { withCredentials: true }
      );

      return data as PrescriptionDetails[];
    },
  });

  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occurred. Please try again later!");
    }
  }

  return (
    <DashboardWrapper>
      <Title>Prescription Details</Title>

      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      )}

      {data && <DataTable columns={columns} data={data} />}
    </DashboardWrapper>
  );
};

export default PrescriptionDetailsPage;
