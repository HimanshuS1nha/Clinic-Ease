import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  addPatientValidator,
  addPatientValidatorType,
} from "@/validators/add-patient-validator";

const AddPatientPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<addPatientValidatorType>({
    defaultValues: {
      age: "",
      gender: "",
      name: "",
    },
    resolver: zodResolver(addPatientValidator),
  });

  const { mutate: handleAddPatient, isPending } = useMutation({
    mutationKey: ["add-patient"],
    mutationFn: async (values: addPatientValidatorType) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/patient/create`,
        { ...values },
        { withCredentials: true }
      );

      return data as { message: string };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      setValue("gender", "");
    },
    onError: (error) => {
      if (error instanceof AxiosError && error.response?.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <DashboardWrapper>
      <Title>Add Patient</Title>

      <form
        className="flex flex-col gap-y-6"
        onSubmit={handleSubmit((data) => handleAddPatient(data))}
      >
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="name">
            Name
          </Label>
          <Input
            placeholder="Enter patient's name"
            id="name"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-rose-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="age">
            Age
          </Label>
          <Input
            placeholder="Enter patient's age"
            type="number"
            id="age"
            {...register("age", { required: true })}
          />
          {errors.age && (
            <p className="text-rose-500 text-sm">{errors.age.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5">Gender</Label>
          <Select
            defaultValue={getValues("gender")}
            onValueChange={(value) => setValue("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select patient's gender" />
            </SelectTrigger>
            <SelectContent id="gender">
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className="text-rose-500 text-sm">{errors.gender.message}</p>
          )}
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Please wait..." : "Add"}
        </Button>
      </form>
    </DashboardWrapper>
  );
};

export default AddPatientPage;
