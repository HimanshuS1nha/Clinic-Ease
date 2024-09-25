import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";

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

import { createPrescriptionValidator } from "@/validators/create-prescription-validator";
import { ZodError } from "zod";

const CreatePrescriptionPage = () => {
  const [patientId, setPatientId] = useState("");
  const [medicines, setMedicines] = useState<string[]>([]);
  const [dosages, setDosages] = useState<string[]>([]);
  const [numberOfMedicines, setNumberOfMedicines] = useState(1);

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

  const handleChangeMedicines = (index: number, value: string) => {
    if (medicines[index]) {
      const newMedicines = medicines.map((item, i) => {
        if (index === i) {
          return value;
        } else {
          return item;
        }
      });

      setMedicines(newMedicines);
    } else {
      const newMedicines = [...medicines, value];

      setMedicines(newMedicines);
    }
  };

  const handleChangeDosages = (index: number, value: string) => {
    if (dosages[index]) {
      const newDosages = dosages.map((item, i) => {
        if (index === i) {
          return value;
        } else {
          return item;
        }
      });

      setDosages(newDosages);
    } else {
      const newDosages = [...dosages, value];

      setDosages(newDosages);
    }
  };

  const { mutate: handleCreatePrescription, isPending } = useMutation({
    mutationKey: ["create-prescription"],
    mutationFn: async () => {
      const parsedData = await createPrescriptionValidator.parseAsync({
        dosages,
        medicines,
        patientId,
      });

      if (medicines.length !== dosages.length) {
        throw new Error(
          "Some error occured. Please refresh the page and try again"
        );
      }

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/prescription/create/${
          parsedData.patientId
        }`,
        {
          dosages: parsedData.dosages,
          medicines: parsedData.medicines,
        },
        { withCredentials: true }
      );

      return data as { message: string };
      return { message: "YO" };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setPatientId("");
      setMedicines([]);
      setDosages([]);
      setNumberOfMedicines(1);
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.error);
      } else {
        toast.error(error.message);
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
          onSubmit={(e) => {
            e.preventDefault();
            handleCreatePrescription();
          }}
        >
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Patient</Label>
            <Select
              value={patientId}
              onValueChange={(value) => setPatientId(value)}
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
          </div>

          {Array.from({ length: numberOfMedicines }, (_, i) => i).map(
            (_, i) => {
              return (
                <React.Fragment key={i}>
                  <div className="flex flex-col gap-y-3">
                    <Label className="ml-1.5" htmlFor={`medicine${i}`}>
                      Medicine {i + 1}
                    </Label>
                    <Input
                      placeholder="Enter medicine"
                      id={`medicine${i}`}
                      type="text"
                      value={medicines[i] || ""}
                      onChange={(e) => handleChangeMedicines(i, e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col gap-y-3">
                    <Label className="ml-1.5" htmlFor={`dosage${i}`}>
                      Dosage {i + 1}
                    </Label>
                    <Input
                      placeholder="Enter dosage"
                      id={`dosage${i}`}
                      type="text"
                      value={dosages[i] || ""}
                      onChange={(e) => handleChangeDosages(i, e.target.value)}
                    />
                  </div>
                </React.Fragment>
              );
            }
          )}

          <div className="flex gap-x-4 items-center">
            <Button
              type="button"
              className="self-start mt-2"
              onClick={() => setNumberOfMedicines((prev) => prev + 1)}
            >
              Add one more medicine
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              className="self-start mt-2"
              onClick={() => {
                if (numberOfMedicines !== 1) {
                  setNumberOfMedicines((prev) => prev - 1);
                }
              }}
              disabled={numberOfMedicines === 1}
            >
              Remove an entry
            </Button>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Please wait..." : "Create"}
          </Button>
        </form>
      )}
    </DashboardWrapper>
  );
};

export default CreatePrescriptionPage;
