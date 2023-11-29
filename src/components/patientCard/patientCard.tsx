import * as React from 'react';
import Box from '@mui/material/Box';
import {Card, CardHeader, CardActionArea, Avatar, Stack, Grid, Typography} from '@mui/material/';
import FaceIcon from '@mui/icons-material/Face';
import Face3Icon from '@mui/icons-material/Face3';
import Paper from '@mui/material/Paper';

import { Patient } from 'components/patientList/';

type PatientCardProps = {
    lastName: string;
    firstName: string;
    key: string;
    sex: string;
    birthDate: Date;
    onClickHandler?: ()=>void;
}

export default function PatientCard(patientCardProps: PatientCardProps) {
  
    return (
        <Paper elevation={3}>
            <Card sx={{ minWidth: 300, display: 'flex'}}>
                <CardActionArea onClick={()=>{patientCardProps.onClickHandler()}}>
                    <Grid container sx={{margin: "10px"}}>
                        <Grid item xs={4}
                                container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justifyContent="center">
                            <Avatar sx={{ width: 48, height: 48}}>
                                {patientCardProps.sex == "M" ? <FaceIcon></FaceIcon> : <Face3Icon></Face3Icon>}
                            </Avatar>
                        </Grid>
                        <Grid item xs={8} textAlign={'left'}>
                            <Typography variant="h6">
                            {patientCardProps.lastName + " " + patientCardProps.firstName}
                            </Typography>
                            <Typography  variant="caption" color="text.secondary">
                            年齡: {calculateAge(patientCardProps.birthDate)} 生理性別: {patientCardProps.sex == "M" ? "男":"女"}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardActionArea>
            </Card>
        </Paper>
    );
}

function calculateAge(birthday: Date) { // birthday is a date
    let ageDifMs = Date.now() - birthday.getTime();
    let ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}