import * as React from 'react';
import {Card, CardContent, Grid, Typography, TextField, Button, Modal} from '@mui/material/';
import { MutateOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

const style = {
    display: 'flex',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type EditOrderSectionProps = {
    patientId: string;
    patientName: string;
    onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
    show: boolean;
    orderIndex: number;
    orderId: string;
    originalContent: string;
    setShowFn: (show: boolean) => void;
    mutateFn: (variable: {message: string, orderId: string}, mutationOptions?: MutateOptions<AxiosResponse<any, any>, Error, { message: string; orderId: string; }, unknown>) => void;
    textFieldValue: string;
    setTextFiedlValueFn: (text: string) => void;
}

export default function EditOrderModal( editOrderModalProps: EditOrderSectionProps) {

    const [helperText, setHelperText] = React.useState("");
    const [textFieldError, setTextFieldError] = React.useState(false);

    const handleClose = () => editOrderModalProps.setShowFn(false);

    return (
            <Modal
                open={editOrderModalProps.show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Card sx={style}>
                
                <Grid container sx={{margin: "10px"}} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} alignContent={'center'}>
                        <CardContent>
                            <Typography textAlign={'center'} variant='subtitle1'>
                                編輯{editOrderModalProps.patientName}的醫囑編號{editOrderModalProps.orderId}
                            </Typography>
                            <Typography textAlign={'center'} variant='subtitle1'>
                                原始內容: {editOrderModalProps.originalContent}
                            </Typography>
                        </CardContent>
                    </Grid>
                    <Grid item xs={12} textAlign={'center'}>
                        <CardContent>
                            <TextField
                                id="order-content"
                                label="醫囑內容"
                                multiline
                                rows={2}
                                fullWidth
                                value={editOrderModalProps.textFieldValue}
                                helperText={helperText}
                                error={textFieldError}
                                onChange={(e)=>{editOrderModalProps.setTextFiedlValueFn(e.target.value)}}
                                onFocus={()=>{
                                    setTextFieldError(false);
                                }}
                                />
                        </CardContent>
                    </Grid>
                    <Grid container item xs={12} justifyContent="center">
                        <Grid item xs={4} textAlign={'center'}>
                            <Button variant="outlined" color="error" onClick={()=>{editOrderModalProps.setShowFn(false)}}>
                                取消
                            </Button>
                        </Grid> 
                        <Grid item xs={4} textAlign={'center'}>
                            <Button variant="contained" color="success" onClick={()=>{
                                    if(editOrderModalProps.textFieldValue == ""){
                                        setHelperText("醫囑內容請不要留白");
                                        setTextFieldError(true);
                                        return;
                                    }
                                    editOrderModalProps.mutateFn({message: editOrderModalProps.textFieldValue, orderId: editOrderModalProps.orderId});
                                }}>
                                確定
                            </Button>
                        </Grid> 
                    </Grid>
                </Grid>
            </Card>
        </Modal>
    );
}