import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";

type TestDetails = {
  id: string;
  testName: string;
  testDate: String;
  result: string;
  labName: string;
  status: "Pending" | "Completed" | "In-Progress";
};

const TestDetailsPage = () => {
  const columns: ColumnDef<TestDetails>[] = [
    {
      accessorKey: "testName",
      header: "Test Name",
    },
    {
      accessorKey: "testDate",
      header: "Date",
    },
    {
      accessorKey: "labName",
      header: "Lab Name",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "result",
      header: "Result",
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-tests"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/testrecords`,
        { withCredentials: true }
      );

      return data as TestDetails[];
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }
  return (
    <DashboardWrapper>
      <Title>Test Details</Title>

      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      )}

      {data && <DataTable columns={columns} data={data} />}
    </DashboardWrapper>
  );
};

export default TestDetailsPage;
