// import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  bookAppointmentValidator,
  bookAppointmentValidatorType,
} from "@/validators/book=appointment-validator";
import { Loader2 } from "lucide-react";

const BookAppointmentPage = () => {
  const [date, setDate] = useState<Date>();

  const {
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<bookAppointmentValidatorType>({
    defaultValues: {
      doctorId: "",
      patientId: "",
    },
    resolver: zodResolver(bookAppointmentValidator),
  });

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

  const {
    data: doctorsData,
    isLoading: doctorsLoading,
    error: doctorsError,
  } = useQuery({
    queryKey: ["get-doctors"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/doctors`,
        {
          withCredentials: true,
        }
      );
      return data as { name: string; _id: string }[];
    },
  });
  if (doctorsError) {
    if (
      doctorsError instanceof AxiosError &&
      doctorsError.response?.data.message
    ) {
      toast.error(doctorsError.response.data.message);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }

  const { mutate: handleBookAppointment, isPending } = useMutation({
    mutationKey: ["book-appointment"],
    mutationFn: async (values: bookAppointmentValidatorType) => {
      if (!date) {
        throw new Error("Please select a date");
      }
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/appointments/create`,
        { ...values, date },
        { withCredentials: true }
      );

      return data as { message: string };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    },
  });
  return (
    <DashboardWrapper>
      <Title>Book Appointment</Title>

      {doctorsLoading || patientsLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      ) : (
        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit((data) => handleBookAppointment(data))}
        >
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Patient</Label>
            <Select
              defaultValue={getValues("patientId")}
              onValueChange={(value) => setValue("patientId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patientsData?.map((item) => {
                  return (
                    <SelectItem value={item._id} key={item._id}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.patientId && (
              <p className="text-rose-500 text-sm">
                {errors.patientId.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Doctor</Label>
            <Select
              defaultValue={getValues("doctorId")}
              onValueChange={(value) => setValue("doctorId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {doctorsData?.map((item) => {
                  return (
                    <SelectItem value={item._id} key={item._id}>
                      {item.name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.doctorId && (
              <p className="text-rose-500 text-sm">{errors.doctorId.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Date</Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Please wait..." : "Book"}
          </Button>
        </form>
      )}
    </DashboardWrapper>
  );
};

export default BookAppointmentPage;
