import * as React from "react";
import { List, ListItem, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

export type OrderHistory = {
    id: string;
    pastEdits: OrderEdits[];
}

export type OrderEdits = {
    id: string;
    entryDate: Date;
    content: string;
}

type OrderHistoryListProps = {
    orderId: string;
}

export default function OrderHistoryList(orderHistoryListProps: OrderHistoryListProps){
    const orderHistoryQuery = useQuery({
        queryKey: ['orderHistoryForOrder'],
        queryFn: async ()=>{
            const res = await axios.get(`http://localhost:5501/api/orderHistory/${orderHistoryListProps.orderId}`);
            const data = res.data as OrderHistory;
            data.pastEdits.forEach((orderEdit)=>{
                orderEdit.entryDate = new Date(orderEdit.entryDate);
            });
            data.pastEdits.sort((a, b)=>{
                const aTime = a.entryDate.getTime();
                const bTime = b.entryDate.getTime();
                if (aTime > bTime){
                    return -1;
                } else if (aTime < bTime){
                    return 1;
                } else {
                    return 0;
                }
            });
            data.pastEdits.shift();
            return data;
        }
    });

    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            此醫囑的編輯歷史:
            {orderHistoryQuery.isFetched && (orderHistoryQuery.data != undefined && orderHistoryQuery.data.pastEdits.length != 0)? orderHistoryQuery.data.pastEdits.map((pastEdit)=>{
                return (
                    <ListItem key={pastEdit.id}>
                        <Grid container>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" sx={{width: "100%"}}>醫囑內容: {pastEdit.content}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="caption" color="text.secondary">編輯日期: {mapDateObjectCH(pastEdit.entryDate)}</Typography>
                            </Grid>
                        </Grid>
                    </ListItem>
                );
            }) : " 此醫囑從未被編輯過"}
        </List>
    );
}

function mapDateObjectCH(date: Date): string{
    return mapDayOfWeekCH(date.getDay()) + " " + date.getFullYear() + "年"+ date.getMonth()+"月" + date.getDate() + "日" + " " + date.toTimeString().split(" ")[0];
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