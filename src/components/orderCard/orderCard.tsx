import * as React from 'react';
import {Card, CardContent, CardActionArea, Avatar, Grid, Typography, Collapse, IconButton} from '@mui/material/';
import EditIcon from '@mui/icons-material/Edit';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import NoteAltIcon from '@mui/icons-material/NoteAlt';

import OrderHistoryList from '../orderHistoryList';

type OrderCardProps = {
    key: string;
    message: string;
    lastEditDate: Date;
    hasBeenEdited: boolean;
    onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
    orderId: string;
    setActiveFn: (orderId: string | ((prevOrderId: string) => string))=> void;
    expand: boolean;
    setEditOrderModal: (show: boolean)=> void;
    setEditingOrderIndexFn: (orderId: number | ((prevOrderId: number) => number)) => void;
    setEditOrderOriginalContentFn: (originalContent: string | ((prevOriginalContent: string) => string)) => void;
    setEditingOrderIdFn: (orderId: string | ((prevOrderId: string) => string)) => void;
    index: number;
}


export default function OrderCard(orderCardProps: OrderCardProps) {

    const handleExpandClick = () => {
        orderCardProps.setActiveFn((prevOrderId)=>{
            console.log(orderCardProps.orderId);
            if (prevOrderId === orderCardProps.orderId){
                return "";
            }else {
                if(orderCardProps.orderId=== "0"){
                    console.log("test zero");
                }
                return orderCardProps.orderId;
            }
        });
    };

    return (
            <Card sx={{ display: 'flex', margin: "10px"}}>
                <Grid container>
                <Grid item xs={10}>
                <CardActionArea onClick={(e)=>{handleExpandClick(); if (orderCardProps.onClickHandler != undefined) orderCardProps.onClickHandler(e)}}>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={2}
                                    alignItems="right"
                                    justifyContent="right">
                                <Avatar sx={{ width: 48, height: 48}}>
                                    {orderCardProps.hasBeenEdited ? <NoteAltIcon></NoteAltIcon> : <ContentPasteIcon></ContentPasteIcon>}
                                </Avatar>
                            </Grid>
                            <Grid item xs={9} textAlign={'left'}>
                                <Typography variant="subtitle1">
                                醫囑編號: {orderCardProps.orderId}
                                </Typography>
                                <Typography variant="subtitle1">
                                醫囑內容: {orderCardProps.message}
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                {(orderCardProps.hasBeenEdited? "最後編輯時間": "新增時間") + ": "+ mapDayOfWeekCH(orderCardProps.lastEditDate.getDay()) + " " + orderCardProps.lastEditDate.getFullYear() + "年"+orderCardProps.lastEditDate.getMonth()+"月" + orderCardProps.lastEditDate.getDate() + "日" + " " + orderCardProps.lastEditDate.toTimeString().split(" ")[0]} {orderCardProps.hasBeenEdited && "(已編輯)"}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Collapse in={orderCardProps.expand} timeout="auto" unmountOnExit>
                            <CardContent>
                                <OrderHistoryList orderId={orderCardProps.orderId}></OrderHistoryList>
                            </CardContent>
                        </Collapse>
                    </CardContent>
                    
                </CardActionArea>
                </Grid>
                <Grid item xs={1} justifyContent={'center'} alignContent={'center'} alignItems={'center'}>
                    <CardContent>
                        <IconButton onClick={()=>{ orderCardProps.setEditingOrderIdFn(orderCardProps.orderId); orderCardProps.setEditOrderModal(true); orderCardProps.setEditingOrderIndexFn(orderCardProps.index); orderCardProps.setEditOrderOriginalContentFn(orderCardProps.message)}}>
                            <EditIcon/>
                        </IconButton>
                    </CardContent>
                </Grid>
                </Grid>
            </Card>
    );
}

function mapDayOfWeekCH(day: number): string{
    switch(day){
    case 1:
        return "星期一";
    case 2:
        return "星期二";
    case 3:
        return "星期三";
    case 4:
        return "星期四";
    case 5:
        return "星期五";
    case 6:
        return "星期六";
    case 7:
        return "星期日";
    default:
        return "未知";
    }
}