import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  addDoctorValidatorType,
  addDoctorValidator,
} from "@/validators/add-doctor-validator";

const AddDoctorPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addDoctorValidatorType>({
    defaultValues: {
      name: "",
      email: "",
      doctorType: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(addDoctorValidator),
  });

  const { mutate: handleAddDoctor, isPending } = useMutation({
    mutationKey: ["add-doctor"],
    mutationFn: async (values: addDoctorValidatorType) => {
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/doctor/create`,
        {
          ...values,
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
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    },
  });
  return (
    <DashboardWrapper>
      <Title>Add Doctor</Title>

      <form
        className="flex flex-col gap-y-6"
        onSubmit={handleSubmit((data) => handleAddDoctor(data))}
      >
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="name">
            Name
          </Label>
          <Input
            placeholder="Enter doctor's name"
            id="name"
            type="text"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <p className="text-rose-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="email">
            Email
          </Label>
          <Input
            placeholder="Enter doctor's email"
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-rose-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="doctorType">
            Doctor Type
          </Label>
          <Input
            placeholder="Enter doctor's type"
            id="doctorType"
            type="type"
            {...register("doctorType", { required: true })}
          />
          {errors.doctorType && (
            <p className="text-rose-500 text-sm">{errors.doctorType.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="password">
            Password
          </Label>
          <Input
            placeholder="Enter doctor's password"
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="text-rose-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="confirmPassword">
            Confirm Password
          </Label>
          <Input
            placeholder="Confirm doctor's password"
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="text-rose-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isPending}>
          {isPending ? "Please wait..." : "Add"}
        </Button>
      </form>
    </DashboardWrapper>
  );
};

export default AddDoctorPage;
