import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  createPrescriptionValidatorType,
  createPrescriptionValidator,
} from "@/validators/create-prescription-validator";

const CreatePrescriptionPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<createPrescriptionValidatorType>({
    defaultValues: {
      dosage: "",
      medicine: "",
      patientId: "",
    },
    resolver: zodResolver(createPrescriptionValidator),
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["get-all-patients"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/patients/get`,
        { withCredentials: true }
      );

      return data as { _id: string; name: string }[];
    },
  });
  if (error) {
    if (error instanceof AxiosError && error.response?.data.message) {
      toast.error(error.response.data.error);
    } else {
      toast.error("Some error occured. Please try again later!");
    }
  }

  const { mutate: handleCreatePrescription, isPending } = useMutation({
    mutationKey: ["create-prescription"],
    mutationFn: async (values: createPrescriptionValidatorType) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/prescription/create/${values.patientId}`,
        {
          dosage: values.dosage,
          medicine: values.medicine,
          patientId: values.patientId,
        },
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
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <DashboardWrapper>
      <Title>Create Prescription</Title>

      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      ) : (
        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit((data) => handleCreatePrescription(data))}
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
                {data?.map((item) => {
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
            <Label className="ml-1.5" htmlFor="medicine">
              Medicine
            </Label>
            <Input
              placeholder="Enter medicine"
              id="medicine"
              type="text"
              {...register("medicine", { required: true })}
            />
            {errors.medicine && (
              <p className="text-rose-500 text-sm">{errors.medicine.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5" htmlFor="medicine">
              Dosage
            </Label>
            <Input
              placeholder="Enter dosage"
              id="dosage"
              type="text"
              {...register("dosage", { required: true })}
            />
            {errors.dosage && (
              <p className="text-rose-500 text-sm">{errors.dosage.message}</p>
            )}
          </div>
          <Button
            type="button"
            className="self-start mt-2"
          >
            Add one more medicine
          </Button>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Please wait..." : "Create"}
          </Button>
        </form>
      )}
    </DashboardWrapper>
  );
};

export default CreatePrescriptionPage;
