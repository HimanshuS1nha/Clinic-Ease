import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";

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

type AppointmentDetails = {
  id: string;
  doctorName: string;
  patientName: string;
  queueNumber: string;
  doctorId: string;
  date: string;
};

const fetchCurrentQueueNumber = async (doctorId: string, date: string) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_API_URL}/appointments/current/${date}/${doctorId}/`,
    { withCredentials: true }
  );
  return data.queueNumber;
};

const isUpcomingAppointment = (dateString: string) => {
  const appointmentDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return appointmentDate >= today;
};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const AppointmentDetailsPage = () => {
  const [appointments, setAppointments] = useState<AppointmentDetails[]>([]);
  const [selectedPatient, setSelectedPatient] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-appointments"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/appointments`,
        { withCredentials: true }
      );
      return data as AppointmentDetails[];
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

  const getQueueNumberForDoctor = (doctorId: string, date: string) => {
    const { data, isLoading } = useQuery({
      queryKey: ["get-current-queue-number", doctorId, date],
      queryFn: () => fetchCurrentQueueNumber(doctorId, date),
      staleTime: 1000 * 60 * 5,
      enabled: !!doctorId && !!date,
    });

    if (isLoading)
      return <Loader2 size={20} className="animate-spin" color="green" />;
    return data || "N/A";
  };

  const columns: ColumnDef<AppointmentDetails>[] = useMemo(
    () => [
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
        cell: ({ row }) => formatDate(row.original.date),
      },
      {
        accessorKey: "queueNumber",
        header: "Queue Number",
      },
      {
        id: "currentQueue",
        header: "Current Queue",
        cell: ({ row }) =>
          getQueueNumberForDoctor(row.original.doctorId, row.original.date),
      },
    ],
    [appointments]
  );

  const filterRecords = () => {
    if (selectedPatient === "") {
      if (data) {
        setAppointments(
          data.filter((appointment) => isUpcomingAppointment(appointment.date))
        );
      }
    } else {
      if (data) {
        setAppointments(
          data.filter(
            (appointment) =>
              isUpcomingAppointment(appointment.date) &&
              appointment.patientName === selectedPatient
          )
        );
      }
    }
  };

  useEffect(() => {
    if (data) {
      setAppointments(
        data.filter((appointment) => isUpcomingAppointment(appointment.date))
      );
    }
  }, [data]);

  useEffect(() => {
    filterRecords();
  }, [selectedPatient]);
  return (
    <DashboardWrapper>
      <Title>Upcoming Appointment Details</Title>

      {isLoading || patientsLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      ) : (
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
          <DataTable columns={columns} data={appointments} />
        </div>
      )}
    </DashboardWrapper>
  );
};

export default AppointmentDetailsPage;
