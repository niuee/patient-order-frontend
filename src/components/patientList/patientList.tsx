import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stack } from "@mui/material";
import PatientCard from "../patientCard";


export type Patient = {
    id: string;
    firstName: string;
    lastName: string;
    sex: string;
    birthDate: Date;
}

type PatientListProps = {
    onClickHandler: (id: string, name: string)=> void;
}

export default function PatientList(patientListProps: PatientListProps){

    const {data, isLoading} = useQuery({
        queryKey: ['patients'],
        queryFn: async ()=>{
            const res = await axios.get("http://localhost:5501/api/patients");
            return res.data as Patient[];
        }
    });

    return (
        <Stack spacing={1}>
            {!isLoading && data && data.map((patient)=>{
                return (
                    <PatientCard
                        lastName={patient.lastName}
                        firstName={patient.firstName}
                        sex={patient.sex}
                        birthDate={new Date(patient.birthDate)}
                        key={patient.id}
                        onClickHandler={()=>{patientListProps.onClickHandler(patient.id, patient.lastName + " " + patient.firstName)}}
                    >
                    </PatientCard>

                );
            })}
        </Stack>
    );
}