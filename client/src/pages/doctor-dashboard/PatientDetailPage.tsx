import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import DashboardWrapper from "@/components/dashboard/DashboardWrapper";
import Title from "@/components/dashboard/Title";
import { DataTable } from "@/components/dashboard/DataTable"; 

type Prescription = {
  id: string;
  medicine: string;
  dosage: string;
};

type TestRecord = {
  id: string;
  testName: string;
  result: string;
};

const PatientDetailsPage = () => {
  const { patientId } = useParams<{ patientId: string }>();

  const { data: prescriptions, isLoading: isLoadingPrescriptions } = useQuery({
    queryKey: ['prescription', patientId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/prescription/${patientId}`,
        { withCredentials: true }
      );
      return data as Prescription[];
    },
  });

  const { data: testRecords, isLoading: isLoadingTestRecords } = useQuery({
    queryKey: ['testRecord', patientId],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/testrecord/${patientId}`,
        { withCredentials: true }
      );
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      return data as TestRecord[];
    },
  });

  const prescriptionColumns = [
    {
      accessorKey: 'medicine',
      header: 'Medicine',
    },
    {
      accessorKey: 'dosage',
      header: 'Dosage',
    },
  ];

  const testRecordColumns = [
    {
      accessorKey: 'testName',
      header: 'Test',
    },
    {
      accessorKey: 'result',
      header: 'Result',
    },
  ];

  if (isLoadingPrescriptions || isLoadingTestRecords) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loader2 size={50} className="animate-spin" color="green" />
      </div>
    );
  }

  return (
    <DashboardWrapper>
      <Title>Patient Details</Title>
      
      <h2 className="text-lg font-semibold mt-5">Prescriptions</h2>
      <DataTable columns={prescriptionColumns} data={prescriptions} />

      <h2 className="text-lg font-semibold mt-5">Test Records</h2>
      <DataTable columns={testRecordColumns} data={testRecords} />
    </DashboardWrapper>
  );
};

export default PatientDetailsPage;
