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

type PrescriptionDetails = {
  id: string;
  patientName: string;
  medicine: string;
  dosage: string;
  createdAt: string; // You can format this as needed
};

const PrescriptionDetailsPage = () => {
  const [prescriptionDetails, setPrescriptionDetails] = useState<
    PrescriptionDetails[]
  >([]);
  const [selectedPatient, setSelectedPatient] = useState("");

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
        setPrescriptionDetails(data);
      }
    } else {
      if (data) {
        setPrescriptionDetails(
          data.filter(
            (prescriptionDetail) =>
              prescriptionDetail.patientName === selectedPatient
          )
        );
      }
    }
  };

  useEffect(() => {
    if (data) {
      setPrescriptionDetails(data);
    }
  }, [data]);

  useEffect(() => {
    filterRecords();
  }, [selectedPatient]);
  return (
    <DashboardWrapper>
      <Title>Prescription Details</Title>

      {isLoading ||
        (patientsLoading && (
          <div className="flex w-full h-full items-center justify-center">
            <Loader2 size={50} className="animate-spin" color="green" />
          </div>
        ))}

      {prescriptionDetails && (
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
          <DataTable columns={columns} data={prescriptionDetails} />
        </div>
      )}
    </DashboardWrapper>
  );
};

export default PrescriptionDetailsPage;
