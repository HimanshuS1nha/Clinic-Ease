import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

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

  const data: TestDetails[] = [
    {
      id: "1",
      testName: "Covid Test",
      testDate: "Sept 13, 2024",
      labName: "Abc Labs",
      status: "Completed",
      result: "Negative",
    },
  ];
  return (
    <DashboardWrapper>
      <Title>Test Details</Title>

      <DataTable columns={columns} data={data} />
    </DashboardWrapper>
  );
};

export default TestDetailsPage;
