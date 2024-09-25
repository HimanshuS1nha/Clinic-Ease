import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type TestDetails = {
  id: string;
  patientName: string;
  testName: string;
  testDate: String;
  result: string;
  labName: string;
};

const TestDetailsPage = () => {
  const [testDetails, setTestDetails] = useState<TestDetails[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const columns: ColumnDef<TestDetails>[] = [
    {
      accessorKey: "patientName",
      header: "Patient Name",
    },
    {
      accessorKey: "testName",
      header: "Test Name",
    },
    {
      accessorKey: "testDate",
      header: "Date",
      cell: ({ row }) => {
        return <p>{row.original.testDate.split("T")[0]}</p>;
      },
    },
    {
      accessorKey: "labName",
      header: "Lab Name",
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

  const {
    data: patientsData,
    isLoading: patientsLoading,
    error: patientsError,
  } = useQuery({
    queryKey: ["get-patients"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/patients`,
        {
          withCredentials: true,
        }
      );

      return data as { name: string; _id: string }[];
    },
  });
  if (patientsError) {
    if (
      patientsError instanceof AxiosError &&
      patientsError.response?.data.message
    ) {
      toast.error(patientsError.response.data.message);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }

  const filterRecords = () => {
    if (selectedPatient === "") {
      if (data) {
        setTestDetails(data);
      }
    } else {
      if (data) {
        setTestDetails(
          data.filter(
            (testDetail) => testDetail.patientName === selectedPatient
          )
        );
      }
    }
  };

  useEffect(() => {
    if (data) {
      setTestDetails(data);
    }
  }, [data]);

  useEffect(() => {
    filterRecords();
  }, [selectedPatient]);
  return (
    <DashboardWrapper>
      <Title>Test Details</Title>

      {patientsLoading ||
        (isLoading && (
          <div className="flex w-full h-full items-center justify-center">
            <Loader2 size={50} className="animate-spin" color="green" />
          </div>
        ))}

      {testDetails && (
        <div className="flex flex-col gap-y-6">
          <div className="flex gap-x-2">
            <Select
              value={selectedPatient}
              onValueChange={(value) => setSelectedPatient(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patientsData?.map((item) => {
                  return (
                    <SelectItem value={item.name} key={item._id}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            <Button
              variant={"destructive"}
              onClick={() => setSelectedPatient("")}
            >
              X
            </Button>
          </div>
          <DataTable columns={columns} data={testDetails} />
        </div>
      )}
    </DashboardWrapper>
  );
};

export default TestDetailsPage;
