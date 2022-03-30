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
                            Cập nhật tình trạng đơn hàng
                        </Typography>

                        <Box className="df aic" my={4}>

                            <TextField className='f1' value={currentTracking} onChange={(e) => setcurrentTracking(e.target.value)} label="Tình trạng giao vận" placeholder="Nhập tình trạng giao vận" />
                            <Button style={{ marginLeft: 16, width: 300, height: 56 }} variant="outlined" onClick={updateOrderTracking} disabled={currentTracking === ''} >
                                Cập nhật tình trạng giao vận
                            </Button>
                        </Box>
                        <Box className="df aic " my={4}>
                            <Select onChange={(e) => {
                                setcurrentState(e.target.value)
                            }} value={currentState || ""} disabled={updating || isDoneAll(tinhtrangdon)} className="f1" label={"Kết quả tổng quan"} defaultValue={currentState}>
                                {Object.values(ORDER_STATE).map((item, index) => (
                                    <MenuItem key={index} value={item} className="cp">{item}</MenuItem>
                                ))}
                            </Select>
                            <Button style={{ marginLeft: 16, width: 300, height: 56 }} variant="outlined" onClick={updateOrderState} disabled={updating || (currentState === "" || currentState === orderInfo.tinhtrangdon) || isDoneAll(tinhtrangdon)} >
                                Cập nhật kết quả tổng quan
                            </Button>
                        </Box>
                        <Box className="df aic jcsb">

                            <Typography variant="h5" className="mv3">
                                Thông tin đơn hàng
                            </Typography>

                        </Box>
                        <Box className="df fdc" mt={2}>
                            <Typography >
                                Mã đơn hàng: {madonhang}
                            </Typography>
                            <Typography >
                                Hình thức thanh toán: {hinhthucthanhtoan}
                            </Typography>
                            <Typography >
                                Ngày lập đơn: {getQuesDateString(ngaylapdon)}
                            </Typography>
                            <Typography>
                                Tình trạng đơn: {tinhtrangdon}
                            </Typography>
                            <Typography>
                                Tổng tiền: {tongtien}
                            </Typography>

                        </Box>
                    </Grid>
                    <Grid item md={6} xs={12} className="df fdc h100" style={{ flexDirection: 'column' }}>
                        <Typography variant="h5" component="h3" style={{ marginBottom: 16 }}>
                            Lịch trình giao vận
                        </Typography>
                        <TableContainer style={{ overflowY: "auto", maxHeight: '100%' }}>
                            <Table stickyHeader>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            Thời gian cập nhật
                                        </TableCell>
                                        <TableCell>
                                            Trạng thái
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
                    {updatingFailed ? "Có lỗi xảy ra, vui lòng thử lại sau" : "Đã đăng ký tiếp nhận đơn hàng thành công"}
                </Alert>
            </Snackbar>
        </>

    )
}

export default TrackingPage