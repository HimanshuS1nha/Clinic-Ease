import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { ZodError } from "zod";

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

import { createMedicalTestValidator } from "@/validators/create-medical-test-validator";
import { useUser } from "@/hooks/useUser";

const CreateMedicalTestPage = () => {
  const { user } = useUser();

  const [date, setDate] = useState<Date>();
  const [numberOfTests, setNumberOfTests] = useState(1);
  const [testNames, setTestNames] = useState<string[]>([]);
  const [testResults, setTestResults] = useState<string[]>([]);
  const [labName, setLabName] = useState("");
  const [patientId, setPatientId] = useState("");

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

  const handleChangeTestNames = (index: number, value: string) => {
    if (testNames[index]) {
      const newTestNames = testNames.map((item, i) => {
        if (i === index) {
          return value;
        } else {
          return item;
        }
      });

      setTestNames(newTestNames);
    } else {
      const newTestNames = [...testNames, value];
      setTestNames(newTestNames);
    }
  };

  const handleChangeTestResults = (index: number, value: string) => {
    if (testResults[index]) {
      const newTestResults = testResults.map((item, i) => {
        if (i === index) {
          return value;
        } else {
          return item;
        }
      });

      setTestResults(newTestResults);
    } else {
      const newTestResults = [...testResults, value];
      setTestResults(newTestResults);
    }
  };

  const { mutate: handleCreateMedicalTest, isPending } = useMutation({
    mutationKey: ["create-medical-test"],
    mutationFn: async () => {
      const parsedData = await createMedicalTestValidator.parseAsync({
        testNames,
        testResults,
        labName,
        patientId,
      });

      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/testrecord/create/${
          parsedData.patientId
        }`,
        {
          patientId: parsedData.patientId,
          doctor: user?._id,
          labName: parsedData.labName,
          testNames: parsedData.testNames,
          testDate: date,
          testResults: parsedData.testResults,
        },
        { withCredentials: true }
      );

      return data as { message: string };
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setLabName("");
      setPatientId("");
      setNumberOfTests(1);
      setTestNames([]);
      setTestResults([]);
      setDate(undefined);
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof AxiosError && error.response?.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
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
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateMedicalTest();
          }}
        >
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Patient</Label>
            {data && (
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
              value={labName}
              onChange={(e) => setLabName(e.target.value)}
            />
          </div>

          {Array.from({ length: numberOfTests }, (_, i) => i).map((_, i) => {
            return (
              <React.Fragment key={i}>
                <div className="flex flex-col gap-y-3">
                  <Label className="ml-1.5" htmlFor={`testName${i}`}>
                    Test {i} Name
                  </Label>
                  <Input
                    placeholder="Enter test name"
                    id={`testName${i}`}
                    type="text"
                    value={testNames[i] || ""}
                    onChange={(e) => handleChangeTestNames(i, e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-y-3">
                  <Label className="ml-1.5" htmlFor={`result${i}`}>
                    Result of Test {i}
                  </Label>
                  <Input
                    placeholder="Enter result"
                    id={`result${i}`}
                    type="text"
                    value={testResults[i] || ""}
                    onChange={(e) => handleChangeTestResults(i, e.target.value)}
                  />
                </div>
              </React.Fragment>
            );
          })}

          <div className="flex gap-x-4 items-center">
            <Button
              type="button"
              className="self-start mt-2"
              onClick={() => setNumberOfTests((prev) => prev + 1)}
            >
              Add one more test
            </Button>
            <Button
              variant={"destructive"}
              type="button"
              className="self-start mt-2"
              disabled={numberOfTests === 1}
              onClick={() => {
                if (numberOfTests !== 1) {
                  setNumberOfTests((prev) => prev - 1);
                }
              }}
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

export default CreateMedicalTestPage;
