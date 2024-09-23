import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { useState } from "react";

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
import { DatePicker } from "@/components/ui/date-picker";

import {
  createMedicalTestValidatorType,
  createMedicalTestValidator,
} from "@/validators/create-medical-test-validator";
import { useUser } from "@/hooks/useUser";

const CreateMedicalTest = () => {
  const { user } = useUser();

  const [date, setDate] = useState<Date>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<createMedicalTestValidatorType>({
    defaultValues: {
      patientId: "",
      testName: "",
      result: "",
      labName: "",
    },
    resolver: zodResolver(createMedicalTestValidator),
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

  const { mutate: handleCreateMedicalTest, isPending } = useMutation({
    mutationKey: ["create-medical-test"],
    mutationFn: async (values: createMedicalTestValidatorType) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/testrecord/create/${values.patientId}`,
        {
          patientId: values.patientId,
          doctor: user?._id,
          labName: values.labName,
          testName: values.testName,
          testDate: date,
          result: values.result,
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
      console.log(error);
      if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Some error occured. Please try again later!");
      }
    },
  });
  return (
    <DashboardWrapper>
      <Title>Create Medical Test</Title>

      {isLoading ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      ) : (
        <form
          className="flex flex-col gap-y-6"
          onSubmit={handleSubmit((data) => handleCreateMedicalTest(data))}
        >
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Patient</Label>
            {data && (
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
            )}
            {errors.patientId && (
              <p className="text-rose-500 text-sm">
                {errors.patientId.message}
              </p>
            )}
          </div>
          
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5" htmlFor="testDate">
              Test Date
            </Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5" htmlFor="labName">
              Lab Name
            </Label>
            <Input
              placeholder="Enter lab name"
              id="labName"
              type="text"
              {...register("labName", { required: true })}
            />
            {errors.labName && (
              <p className="text-rose-500 text-sm">{errors.labName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5" htmlFor="testName">
              Test Name
            </Label>
            <Input
              placeholder="Enter test name"
              id="testName"
              type="text"
              {...register("testName", { required: true })}
            />
            {errors.testName && (
              <p className="text-rose-500 text-sm">{errors.testName.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5" htmlFor="result">
              Result
            </Label>
            <Input
              placeholder="Enter result"
              id="result"
              type="text"
              {...register("result", { required: true })}
            />
            {errors.result && (
              <p className="text-rose-500 text-sm">{errors.result.message}</p>
            )}
          </div>

          <Button
            type="button"
            className="self-start mt-2"
          >
            Add one more test
          </Button>


          <Button type="submit" disabled={isPending}>
            {isPending ? "Please wait..." : "Create"}
          </Button>
        </form>
      )}
    </DashboardWrapper>
  );
};

export default CreateMedicalTest;
