import React from 'react';
import {Grid, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PatientList from '../components/patientList';
import OrderDialog from '../components/orderDialog';



export function Home():JSX.Element{
    const [openDialog, setDialogDisplay] = React.useState(false);
    const [currentSelectedPatientID, setPatientID] = React.useState("");
    const [currentSelectedPatientName, setPatientName] = React.useState("");
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

            <Typography variant='h5' >住民及其醫囑列表</Typography>
            <PatientList onClickHandler={(patientId: string, patientName: string)=>{setDialogDisplay(true); setPatientID(patientId); setPatientName(patientName)}}></PatientList>
            <OrderDialog
            patientId={currentSelectedPatientID}
            patientName={currentSelectedPatientName}
            open={openDialog}
            onClose={()=>{setDialogDisplay(false)}}
            >

            </OrderDialog>
        </Grid> 
    );
}