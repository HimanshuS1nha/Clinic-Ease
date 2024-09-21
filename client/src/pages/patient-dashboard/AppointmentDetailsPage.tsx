import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";
import { useMemo } from "react";

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

  const day = String(date.getDate()).padStart(2, '0'); 
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};


const AppointmentDetailsPage = () => {
  const { data: appointments, isLoading, error } = useQuery({
    queryKey: ["get-appointments"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/appointments`,
        { withCredentials: true }
      );
      return data as AppointmentDetails[];
    },
  });
  const upcomingAppointments = useMemo(() => {
    return appointments?.filter((appointment) =>
      isUpcomingAppointment(appointment.date)
    );
  }, [appointments]);

  const getQueueNumberForDoctor = (doctorId: string, date: string) => {
    const { data, isLoading } = useQuery({
      queryKey: ["get-current-queue-number", doctorId, date],
      queryFn: () => fetchCurrentQueueNumber(doctorId, date),
      staleTime: 1000 * 60 * 5, 
      enabled: !!doctorId && !!date, 
    });

    if (isLoading) return <Loader2 size={20} className="animate-spin" color="green" />;
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
        cell: ({ row }) =>
          formatDate(row.original.date),
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
    [upcomingAppointments]
  );

  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occurred. Please try again later!");
    }
  }

  return (
    <DashboardWrapper className="">
      <Title>Upcoming Appointment Details</Title>

      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      ) : (
        upcomingAppointments && (
          <DataTable columns={columns} data={upcomingAppointments} />
        )
      )}
    </DashboardWrapper>
  );
};

export default AppointmentDetailsPage;
