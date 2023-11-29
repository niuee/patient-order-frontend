import * as React from 'react';
import {Card, CardContent, Grid, Typography, TextField, Button} from '@mui/material/';

import { MutateOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';



type InsertOrderCardProps = {
    patientId: string;
    onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
    cancelFn: (append: boolean)=> void;
    mutateFn: (variable: {message: string, patientId: string}, mutationOptions?: MutateOptions<AxiosResponse<any, any>, Error, { message: string; patientId: string; }, unknown>) => void;
}

export default function InsertOrderCard(insertOrderCardProps: InsertOrderCardProps) {

    const [orderContent, setOrderContent] = React.useState("");
    const [helperText, setHelperText] = React.useState("");
    const [orderMessageTextFieldError, setOrderMessageTextFieldError] = React.useState(false);

    // const [datePickerValue, setDatePickerValue] = React.useState<Dayjs | null>(null);
    // const [datePickerColor, setDatePickerColor] = React.useState<"primary"|"error">("primary");
    // const [datePickerHelperText, setDatePickerHelperText] = React.useState("");

    // const [timePickerValue, setTimePickerValue] = React.useState<Dayjs | null>(null);
    // const [timePickerColor, setTimePickerColor] = React.useState<"primary" | "error">("primary");
    // const [timePickerHelperText, setTimePickerHelperText] = React.useState("");

    return (
            <Card sx={{ display: 'flex'}}>
                
                <Grid container sx={{margin: "10px"}} justifyContent={'center'} alignItems={'center'}>
                    <Grid item xs={12} alignContent={'center'}>
                        <CardContent>
                            <Typography textAlign={'center'} variant='subtitle1'>
                                新增醫囑
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
                                value={orderContent}
                                onChange={(e)=>{setOrderContent(e.target.value)}}
                                helperText={helperText}
                                error={orderMessageTextFieldError}
                                onFocus={()=>{setOrderMessageTextFieldError(false)}}
                                />
                        </CardContent>
                    </Grid>
                    {/* <Grid item xs={12} textAlign={'center'} justifyContent={'center'} alignContent={'center'}>
                        <DatePicker label="有效日期" slotProps={{textField:{color: datePickerColor, focused: true, helperText: datePickerHelperText, onFocus: ()=>{ setDatePickerColor("primary"); setDatePickerHelperText(""); } }}} value={datePickerValue} onChange={(newValue)=>{setDatePickerValue(newValue)}} />
                        <TimePicker  sx={{marginLeft: "10px"}} label="有效時間" slotProps={{textField: {color: timePickerColor, focused: true, helperText: timePickerHelperText, onFocus: ()=>{setTimePickerColor("primary"); setTimePickerHelperText("");}}}} value={timePickerValue} onChange={(newValue)=>{setTimePickerValue(newValue)}}/>
                    </Grid> */}
                    <Grid container justifyContent="center" sx={{marginTop: "10px"}}>
                        <Grid item xs={4} textAlign={'center'}>
                            <Button variant="outlined" color="error" onClick={()=>{insertOrderCardProps.cancelFn(false)}}>
                                取消
                            </Button>
                        </Grid> 
                        <Grid item xs={4} textAlign={'center'}>
                            <Button variant="contained" color="success" onClick={()=>{
                                    if(orderContent == ""){
                                        setHelperText("醫囑內容請不要留白");
                                        setOrderMessageTextFieldError(true);
                                        return;
                                    }
                                    // if(datePickerValue == null){
                                    //     setDatePickerColor("error");
                                    //     setDatePickerHelperText("有效日期請不要留白");
                                    //     return;
                                    // }
                                    // if(timePickerValue == null){
                                    //     setTimePickerColor("error");
                                    //     setTimePickerHelperText("有效日期請不要留白");
                                    //     return;

                                    // }
                                    // console.log(datePickerValue.toISOString());
                                    // console.log(timePickerValue.toDate().toString());
                                    insertOrderCardProps.mutateFn({message: orderContent, patientId: insertOrderCardProps.patientId})
                                
                                }}>
                                確定
                            </Button>
                        </Grid> 
                    </Grid>
                </Grid>
            </Card>
    );
}