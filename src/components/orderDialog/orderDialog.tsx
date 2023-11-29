import * as React from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { DialogContent, Grid, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

import OrderList from '../orderList';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export interface OrderDialogProps {
    patientName: string;
    patientId: string;
    open: boolean;
    onClose: (value: string) => void;
}

export default function OrderDialog(orderDialogProps: OrderDialogProps){
    const { onClose, open } = orderDialogProps;
    const [appendInsertCard, setInsertCard] = React.useState(false);
    const dialogRef = React.useRef(null);

    const handleClose = () => {
        setInsertCard(false);
        onClose("test");
    };

    return (
        <Dialog fullWidth={true} maxWidth={"md"} sx={{height: "80vh", maxHeight: "80vh", minHeight: "80vh"}} scroll="paper" onClose={handleClose} open={open}>
            <DialogTitle textAlign='center'>
                <Grid container sx={{margin: "10px"}}>
                    <Grid item xs={11} textAlign={'center'}>
                        <Typography variant="subtitle1">
                            {orderDialogProps.patientName + " "}的醫囑列表
                        </Typography>
                    </Grid>
                    <Grid item xs={1}
                            alignItems="right"
                            justifyContent="right">
                        <IconButton onClick={()=>{ setInsertCard((curAppend)=> {if (dialogRef.current !== null && !curAppend){dialogRef.current.scrollTo({ top: 0, behavior: 'smooth' });} return !curAppend;})}}>
                            <AddIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent ref={dialogRef} sx={{maxWidth: "100vw"}} dividers={true}>
                <OrderList
                    patientName={orderDialogProps.patientName}
                    appendAtTopForInsert={appendInsertCard}
                    setAppendFn={setInsertCard}
                    patientId={orderDialogProps.patientId}
                />
            </DialogContent>
        </Dialog>
    );
}