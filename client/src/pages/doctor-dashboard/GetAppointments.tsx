import { useQuery, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import toast from "react-hot-toast";
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
type AppointmentDetails = {
  id: string;
  doctorName: string;
  patientName: string;
  patientId: string;
  queueNumber: string;
  doctorId: string;
  status: string;
  appointmentDate: string;
};

const isTodayAppointment = (dateString: string, status: string) => {
  const appointmentDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endToday = new Date();
  endToday.setHours(23, 59, 59, 59);
  return appointmentDate >= today && appointmentDate<=endToday && status !== "Completed";
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const AppointmentDetailsPage = () => {
  const navigate = useNavigate();
  const {
    data: appointments,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["get-doctor-appointments"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/appointments/doctor`,
        { withCredentials: true }
      );
      return data as AppointmentDetails[];
    },
  });

  const { mutate: completeAppointment } = useMutation({
    mutationFn: async (appointmentId: string) => {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments/complete`,
        { appointmentId },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("Appointment marked as completed");
      refetch();
    },
    onError: () => {
      toast.error("Error completing the appointment. Please try again.");
    },
  });

  const { mutate: skipAppointment } = useMutation({
    mutationFn: async (appointmentId: string) => {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments/later`,
        { appointmentId },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      toast.success("Appointment marked as later");
    },
    onError: () => {
      toast.error("Error skipping the appointment. Please try again.");
    },
  });

  const upcomingAppointments = useMemo(() => {
    return appointments?.filter((appointment) =>
      isTodayAppointment(appointment.appointmentDate, appointment.status)
    );
  }, [appointments]);

  const columns: ColumnDef<AppointmentDetails>[] = useMemo(
    () => [
      {
        accessorKey: "patientName",
        header: "Patient Name",
      },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ row }) => formatDate(row.original.appointmentDate),
      },
      {
        accessorKey: "queueNumber",
        header: "Queue Number",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const appointmentId = row.original.id;
          return (
            <div className="space-x-2">
              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() => completeAppointment(appointmentId)}
              >
                Mark Complete
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded"
                onClick={() => skipAppointment(appointmentId)}
              >
                Skip Appointment
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  navigate(
                    `/dashboard/doctor/patient/${row.original.patientId}`
                  )
                }
              >
                See Details
              </button>
            </div>
          );
        },
      },
    ],
    [completeAppointment, skipAppointment, navigate]
  );

  if (error) {
    if (error instanceof AxiosError && error.response?.data.error) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occurred. Please try again later!");
    }
  }

  return (
    <DashboardWrapper>
      <Title>Doctor's Upcoming Appointments</Title>

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
