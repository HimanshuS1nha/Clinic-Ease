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

const AddPatientPage = () => {
  return (
    <DashboardWrapper>
      <Title>Add Patient</Title>

      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5">Name</Label>
          <Input placeholder="Enter patient's name" />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5">Age</Label>
          <Input placeholder="Enter patient's age" type="number" />
        </div>
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5">Gender</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select patient's gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button>Book</Button>
    </DashboardWrapper>
  );
};

export default AddPatientPage;
