import { Alert, Button, CircularProgress, Grid, MenuItem, Paper, Select, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIGet, SOURCE } from "../../../api/axios/method";
import { ORDER_STATE } from "../../../utils/constant";
import { getQuesDateString } from "../../../utils/date";

const TrackingPage = () => {
    let { orderId } = useParams();

    const [orderTracking, setorderTracking] = useState([]);
    const [loading, setloading] = useState(false);
    const [updating, setupdating] = useState(false)
    const [updatingFailed, setupdatingFailed] = useState(true);
    const [currentTracking, setcurrentTracking] = useState('');
    const [currentState, setcurrentState] = useState('');
    const [orderInfo, setorderInfo] = useState({});
    const [openSnackbar, setopenSnackbar] = useState(false);

    const isDoneAll = (tinhtrangdon) => tinhtrangdon === ORDER_STATE.CANCEL || tinhtrangdon === ORDER_STATE.DONE || tinhtrangdon === ORDER_STATE.RETURN;


    useEffect(() => {
        const fetchAPI = async () => {
            setloading(true);
            const result = await APIGet({ url: `/tinhtrangvandon/${orderId}`, source: SOURCE.CSHARP });
            const result1 = await APIGet({ url: `/donhang/detail/${orderId}`, source: SOURCE.CSHARP });
            setorderTracking(result.data);
            setorderInfo(result1.data);
            setloading(false);
            setcurrentState(result1.data.tinhtrangdon)
        }
        try {
            fetchAPI();
        } catch (error) {
            setupdatingFailed(true);
            setopenSnackbar(true);
        }
    }, [orderId]);

    const updateOrderTracking = async () => {
        if (currentTracking === '') return;
        try {
            setupdatingFailed(true)
            setupdating(true);
            const updateData = { madonhang: orderId, thoigiancapnhat: new Date().toLocaleString(), trangthai: currentTracking }
            const result = await axios(`https://localhost:44369/api/tinhtrangvandon`, {
                method: "POST",
                credentials: 'include',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    "Access-Control-Allow-Origin": "*"
                },
                data: JSON.stringify(updateData)
            })

            if (result?.status === 201) {
                setorderTracking([...orderTracking, updateData])
                setupdatingFailed(false);
                setupdating(false)
            }
        } catch (error) {
            setupdatingFailed(true);
            setopenSnackbar(true);

        }
        finally {
            setupdating(false);
            setopenSnackbar(true);
        }
    }

    const updateOrderState = async () => {
        if (currentState === "" || currentState === orderId.tinhtrangdon) return
        try {
            setupdatingFailed(true)
            setupdating(true);
            const updateData = { ...orderInfo, tinhtrangdon: currentState }
            const result = await axios(`https://localhost:44369/api/donhang/${orderId}`, {
                method: "PUT",
                credentials: 'include',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                data: JSON.stringify(updateData)
            })
            const updateItem = { madonhang: orderId, thoigiancapnhat: new Date().toLocaleString(), trangthai: currentState }

            const result1 = await axios(`https://localhost:44369/api/tinhtrangvandon`, {
                method: "POST",
                credentials: 'include',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                data: JSON.stringify(updateItem)
            })
            if (result?.status === 200 && result1?.status === 201) {
                setorderTracking([updateItem, ...orderTracking])
                setorderInfo(updateData)
                setorderInfo(result.data)
                setupdatingFailed(false);
                setupdating(false)
            }
        } catch (error) {
            console.log(error);
            setupdatingFailed(true);
            setopenSnackbar(true);
        }
        finally {
            setupdating(false);
            setopenSnackbar(true);
        }
    }

    const { madonhang, hinhthucthanhtoan, ngaylapdon, tinhtrangdon, tongtien } = orderInfo

    return loading || (Object.keys(orderInfo) === 0) ? <CircularProgress /> : (
        <>
            <Paper className="w100 h100 df " style={{ padding: 24, height: 'calc(100vh - 116px)' }} >
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12} className="f1" >
                        <Typography variant="h5" component="h3">
                            C???p nh???t t??nh tr???ng ????n h??ng
                        </Typography>

                        <Box className="df aic" my={4}>

                            <TextField className='f1' value={currentTracking} onChange={(e) => setcurrentTracking(e.target.value)} label="T??nh tr???ng giao v???n" placeholder="Nh???p t??nh tr???ng giao v???n" />
                            <Button style={{ marginLeft: 16, width: 300, height: 56 }} variant="outlined" onClick={updateOrderTracking} disabled={currentTracking === ''} >
                                C???p nh???t t??nh tr???ng giao v???n
                            </Button>
                        </Box>
                        <Box className="df aic " my={4}>
                            <Select onChange={(e) => {
                                setcurrentState(e.target.value)
                            }} value={currentState || ""} disabled={updating || isDoneAll(tinhtrangdon)} className="f1" label={"K???t qu??? t???ng quan"} defaultValue={currentState}>
                                {Object.values(ORDER_STATE).map((item, index) => (
                                    <MenuItem key={index} value={item} className="cp">{item}</MenuItem>
                                ))}
                            </Select>
                            <Button style={{ marginLeft: 16, width: 300, height: 56 }} variant="outlined" onClick={updateOrderState} disabled={updating || (currentState === "" || currentState === orderInfo.tinhtrangdon) || isDoneAll(tinhtrangdon)} >
                                C???p nh???t k???t qu??? t???ng quan
                            </Button>
                        </Box>
                        <Box className="df aic jcsb">

                            <Typography variant="h5" className="mv3">
                                Th??ng tin ????n h??ng
                            </Typography>

                        </Box>
                        <Box className="df fdc" mt={2}>
                            <Typography >
                                M?? ????n h??ng: {madonhang}
                            </Typography>
                            <Typography >
                                H??nh th???c thanh to??n: {hinhthucthanhtoan}
                            </Typography>
                            <Typography >
                                Ng??y l???p ????n: {getQuesDateString(ngaylapdon)}
                            </Typography>
                            <Typography>
                                T??nh tr???ng ????n: {tinhtrangdon}
                            </Typography>
                            <Typography>
                                T???ng ti???n: {tongtien}
                            </Typography>

                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12} className="df fdc h100" style={{ flexDirection: 'column' }}>
                        <Typography variant="h5" component="h3" style={{ marginBottom: 16 }}>
                            L???ch tr??nh giao v???n
                        </Typography>
                        <TableContainer style={{ overflowY: "auto", maxHeight: '100%' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Th???i gian c???p nh???t
                                        </TableCell>
                                        <TableCell>
                                            Tr???ng th??i
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(orderTracking || []).sort((a, b) => {
                                        return new Date(a.thoigiancapnhat) > new Date(b.thoigiancapnhat) ? -1 : 1
                                    })?.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {getQuesDateString(new Date(item.thoigiancapnhat))}
                                            </TableCell>
                                            <TableCell>
                                                {item.trangthai}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setopenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setopenSnackbar(false)} severity={updatingFailed ? "error" : "success"} sx={{ width: '100%' }}>
                    {updatingFailed ? "C?? l???i x???y ra, vui l??ng th??? l???i sau" : "???? ????ng k?? ti???p nh???n ????n h??ng th??nh c??ng"}
                </Alert>
            </Snackbar>
        </>

    )
}

export default TrackingPage