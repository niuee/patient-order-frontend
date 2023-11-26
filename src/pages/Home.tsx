import React from 'react';
import {Grid, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PatientCard from "../components/patientCard";


export function Home():JSX.Element{
    let navigate = useNavigate();
    return(
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
            >

            <Typography variant='h1' >病患及其醫囑列表</Typography>
            <PatientCard></PatientCard>
        </Grid> 
    );
}