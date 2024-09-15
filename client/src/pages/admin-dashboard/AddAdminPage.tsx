import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import {
  addAdminValidator,
  addAdminValidatorType,
} from "@/validators/add-admin-validator";

const AddAdminPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<addAdminValidatorType>({
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(addAdminValidator),
  });

  const { mutate: handleAddAdmin, isPending } = useMutation({
    mutationKey: ["add-admin"],
    mutationFn: async (values: addAdminValidatorType) => {
      if (values.password !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/create`,
        {
          name: values.name,
          mobile: values.phoneNumber,
          password: values.password,
          email: values.email,
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
      <Title>Add Admin</Title>

      <form
        className="flex flex-col gap-y-6"
        onSubmit={handleSubmit((data) => handleAddAdmin(data))}
      >
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="name">
            Name
          </Label>
          <Input
            placeholder="Enter admin's name"
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
            placeholder="Enter admin's email"
            id="email"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-rose-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="phoneNumber">
            Phone Number
          </Label>
          <Input
            placeholder="Enter admin's phone number"
            id="phoneNumber"
            type="number"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && (
            <p className="text-rose-500 text-sm">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5" htmlFor="password">
            Password
          </Label>
          <Input
            placeholder="Enter admin's password"
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
            placeholder="Confirm admin's password"
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

export default AddAdminPage;
