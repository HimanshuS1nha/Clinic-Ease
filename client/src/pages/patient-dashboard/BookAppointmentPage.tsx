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

const BookAppointmentPage = () => {
  const [date, setDate] = useState<Date>();
  return (
    <DashboardWrapper>
      <section className="bg-white w-[95%] h-[95%] rounded-xl shadow-lg shadow-gray-300 p-6 flex flex-col gap-y-10">
        <Title>Book Appointment</Title>

        <div className="flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Doctor</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="abc">ABC</SelectItem>
                <SelectItem value="def">DEF</SelectItem>
                <SelectItem value="ghi">GHI</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-3">
            <Label className="ml-1.5">Date</Label>
            <DatePicker date={date} setDate={setDate} />
          </div>
        </div>
        <Button>Book</Button>
      </section>
    </DashboardWrapper>
  );
};

export default BookAppointmentPage;
