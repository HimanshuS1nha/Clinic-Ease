import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
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

type FormValues = {
  image: FileList;
  patientId: string;
};

const UploadTestRecordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm<FormValues>();

  const { data: patients, isLoading: isLoadingPatients } = useQuery({
    queryKey: ["get-all-patients"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/patients/get`,
        { withCredentials: true }
      );
      return data as { _id: string; name: string }[];
    },
  });

  const { mutate: handleUpload, isPending } = useMutation({
    mutationKey: ["upload-test-record"],
    mutationFn: async (formData: FormData) => {
      const patientId = getValues("patientId"); 
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/testrecord/createbyimage/${patientId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
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
        toast.error("An error occurred during the upload.");
      }
    },
  });

  const onSubmit = (data: FormValues) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    handleUpload(formData);
  };

  return (
    <DashboardWrapper>
      <Title>Upload Test Record Image</Title>

      {isLoadingPatients ? (
        <div className="flex w-full h-full items-center justify-center">
          <Loader2 size={50} className="animate-spin" color="green" />
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Patient</Label>
            <Select
              onValueChange={(value) => setValue("patientId", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {patients?.map((item) => (
                  <SelectItem value={item._id} key={item._id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.patientId && (
              <p className="text-rose-500 text-sm">{errors.patientId.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5" htmlFor="image">
              Test Record Image
            </Label>
            <Input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
            />
            {errors.image && (
              <p className="text-rose-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Please wait..." : "Upload"}
          </Button>
        </form>
      )}
    </DashboardWrapper>
  );
};

export default UploadTestRecordPage;
