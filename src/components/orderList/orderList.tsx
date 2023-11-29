
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Stack, Typography, Box } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import OrderCard from "../orderCard";
import InsertOrderCard from "../insertOrderCard";
import EditOrderModal from "../editOrderModal";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props,ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export type Patient = {
    id: string;
    firstName: string;
    lastName: string;
    sex: string;
    birthDate: Date;
}

export type Order = {
    id: string;
    message: string;
    hasBeenEdited: boolean;
    lastEditDate: Date;
}

type OrderListProps = {
    appendAtTopForInsert: boolean;
    setAppendFn: (append: boolean) => void;
    patientId: string;
    patientName: string;
}

export default function OrderList(orderListProps: OrderListProps){


    const [insertNewOrderSuccessSnackbarOpen, setInsertNewOrderSuccessSnackbarOpen] = React.useState(false);
    const [insertNewOrderFailSnackbarOpen, setInsertNewOrderFailSnackbarOpen] = React.useState(false);

    const [editOrderSuccessSnackbarOpen, setEditOrderSuccessSnackbarOpen] = React.useState(false);
    const [editOrderFailSnackbarOpen, setEditOrderFailSnackbarOpen] = React.useState(false);

    const [activeExpandOrderId, setActiveExpandOrderId] = React.useState("");

    const [showEditModal, setShowEditModal] = React.useState(false);
    const [orderIndexBeingEdited, setOrderIndexBeingEdited] = React.useState<number>(0);
    const [orderBeingEditedOriginalContent, setOrderBeingEditedOriginalContent] = React.useState("");
    const [orderIdBeingEdited, setOrderIdBeingEdited] = React.useState("");
    const [editOrderModalTextFieldContent, setEditModalOrderTextFieldContent] = React.useState("");
    
    const handleInsertNewOrderSuccessSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setInsertNewOrderSuccessSnackbarOpen(false);
    };
    const handleInsertNewOrderFailSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setInsertNewOrderFailSnackbarOpen(false);
    };
    const handleEditOrderSuccessSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setEditOrderSuccessSnackbarOpen(false);
    };
    const handleEditOrderFailSnackbarClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        setEditOrderFailSnackbarOpen(false);
    };
    
    const {data, isLoading, isError, refetch} = useQuery({
        queryKey: ['orderForPatient'],
        queryFn: async ()=>{
            const res = await axios.get(`http://localhost:5501/api/patientOrders/${orderListProps.patientId}`);
            const data = res.data as Order[];
            data.forEach((order)=>{
                order.lastEditDate = new Date(order.lastEditDate);
            });
            data.sort((a, b)=>{
                const aTime = a.lastEditDate.getTime();
                const bTime = b.lastEditDate.getTime();
                if (aTime > bTime){
                    return -1;
                } else if (aTime < bTime){
                    return 1;
                } else {
                    return 0;
                }
            });
            return data;
        }
    });

    const mutation = useMutation({
        mutationFn: async (orderBody: {message: string, patientId: string}) =>{
            try{
                const res = await axios.post("http://localhost:5501/api/order", orderBody);
                orderListProps.setAppendFn(false);
                setInsertNewOrderSuccessSnackbarOpen(true);
                refetch();
                setActiveExpandOrderId("");
                return res;
            } catch(e){
                setInsertNewOrderFailSnackbarOpen(true);
                console.log("failed route");
            }
        }
    });

    const mutationForOrderEdits = useMutation({
        mutationFn: async (orderBody: {message: string, orderId: string}) =>{
            try{
                const res = await axios.post("http://localhost:5501/api/order", orderBody);
                setShowEditModal(false);
                setEditOrderSuccessSnackbarOpen(true);
                setEditModalOrderTextFieldContent("");
                refetch();
                setActiveExpandOrderId("");
                return res;
            } catch(e){
                setEditOrderFailSnackbarOpen(true);
                console.log("failed route");
            }
        }
    });

    return (
        <Box>
            <Stack spacing={1} sx={{margin: "10px"}}>
                {orderListProps.appendAtTopForInsert && <InsertOrderCard cancelFn={orderListProps.setAppendFn} patientId={orderListProps.patientId} mutateFn={mutation.mutate}/>}
                {!isLoading && data &&  data.length != 0 ? data.map((order, index, array)=>{
                    return (
                        <OrderCard
                            expand={order.id === activeExpandOrderId}
                            setActiveFn={setActiveExpandOrderId}
                            key={orderListProps.patientId+order.id}
                            orderId={order.id}
                            message={order.message}
                            hasBeenEdited={order.hasBeenEdited}
                            lastEditDate={new Date(order.lastEditDate)}
                            setEditOrderModal={setShowEditModal}
                            index={array.length - index}
                            setEditingOrderIndexFn={setOrderIndexBeingEdited}
                            setEditingOrderIdFn={setOrderIdBeingEdited}
                            setEditOrderOriginalContentFn={setOrderBeingEditedOriginalContent}
                        >
                        </OrderCard>

                        );
                    }): <Typography>此住民沒有任何醫囑</Typography>
                }
                {/* <Typography>Active Expand: {activeExpandOrderId}</Typography> */}
            </Stack>
            <Snackbar open={insertNewOrderSuccessSnackbarOpen} autoHideDuration={6000} onClose={handleInsertNewOrderSuccessSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleInsertNewOrderSuccessSnackbarClose} severity="success" sx={{ width: "100%" }}>
                    新增醫囑成功!
                </Alert>
            </Snackbar>
            <Snackbar open={insertNewOrderFailSnackbarOpen} autoHideDuration={6000} onClose={handleInsertNewOrderFailSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleInsertNewOrderFailSnackbarClose} sx={{width: "100%"}}severity="error">
                    新增醫囑失敗!
                </Alert>
            </Snackbar>
            <Snackbar open={editOrderSuccessSnackbarOpen} autoHideDuration={6000} onClose={handleEditOrderSuccessSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleEditOrderSuccessSnackbarClose} severity="success" sx={{ width: "100%" }}>
                    編輯醫囑成功!
                </Alert>
            </Snackbar>
            <Snackbar open={editOrderFailSnackbarOpen} autoHideDuration={6000} onClose={handleEditOrderFailSnackbarClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleEditOrderFailSnackbarClose} sx={{width: "100%"}}severity="error">
                    編輯醫囑失敗!
                </Alert>
            </Snackbar>
            <EditOrderModal
                patientId={orderListProps.patientId}
                show={showEditModal}
                setShowFn={setShowEditModal}
                orderIndex={orderIndexBeingEdited}
                patientName={orderListProps.patientName}
                originalContent={orderBeingEditedOriginalContent}
                orderId={orderIdBeingEdited}
                mutateFn={mutationForOrderEdits.mutate}
                textFieldValue={editOrderModalTextFieldContent}
                setTextFiedlValueFn={setEditModalOrderTextFieldContent}
            />

        </Box>
    );
}
