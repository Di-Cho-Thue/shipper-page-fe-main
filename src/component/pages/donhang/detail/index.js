import { Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APIGet, SOURCE } from "../../../../api/axios/method";
import { ORDER_STATE } from "../../../../utils/constant";
import { getQuesDateString } from "../../../../utils/date";
import { getUserFieldFromCookieOrLocalStorage } from "../../../../utils/localStorage";

const OrderDetailPage = () => {
    const [userInfo, setuserInfo] = useState({});
    const [currentOrder, setcurrentOrder] = useState({});
    const [loading, setloading] = useState(false);
    const [currentDetailOrder, setcurrentDetailOrder] = useState([]);
    const [gianHang, setgianHang] = useState([]);


    let { orderId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            setloading(true);
            const order = await APIGet({ url: `/donhang/detail/${orderId}`, source: SOURCE.CSHARP })
            const orderDetail = await APIGet({ url: `/chitietdonhang/${orderId}`, source: SOURCE.CSHARP })
            const userInfo = await APIGet({ url: `/khachhang/${order.data.makhachhang}`, source: SOURCE.CSHARP })
            const gianHang = await APIGet({ url: `/gianhang/${order.data.gianhang}`, source: SOURCE.CSHARP })
            setuserInfo((userInfo?.data || {}));
            setcurrentDetailOrder((orderDetail?.data || []).map((item) => {
                return {
                    ...item,
                    soluong: item.chiTietDonHang.soluong,
                    total: item.chiTietDonHang.soluong * item.chiTietDonHang.dongia || 0,
                }
            }));
            setcurrentOrder((order?.data || {}));
            if (order?.data.manguoigiaohang === idUser) {
                setdoneSubmitting(true);
            }
            setgianHang(gianHang?.data || {});
            setloading(false)
        }
        try {
            fetchData();

        } catch (error) {
            console.log(error)
        }
        finally {
            setloading(false)
        }
    }, [])

    const { hoten_kh, phuongxa_kh, quanhuyen_kh, sodienthoai_kh, sonha_kh, thanhpho_kh } = userInfo;
    const { madonhang, hinhthucthanhtoan, ngaylapdon, tinhtrangdon, tongtien, manguoigiaohang } = currentOrder;
    const { luottheodoi_gh, motagianhang, phuongxa_gh, quanhuyen_gh, sonha_gh, tengianhang, thanhpho_gh, } = gianHang;

    const columns = [
        "Mã sản phẩm",
        "Tên sản phẩm",
        "Hình ảnh sản phẩm",
        "Số lượng",
        "Giá sản phẩm",
        "Thành tiền"
    ];

    const dataColumns = [
        "masanpham",
        "tensanpham",
        "hinhanh",
        "soluong",
        "giasanpham",
        "total"
    ]

    const [open, setopen] = useState(false);
    const [submitting, setsubmitting] = useState(false);
    const handleClickOpen = () => { setopen(true) };
    const handleClose = () => { setopen(false) };
    const [isSubmittingError, setisSubmittingError] = useState(true);
    const [openSnackbar, setopenSnackbar] = useState(false);
    const [doneSubmitting, setdoneSubmitting] = useState(false);
    const idUser = getUserFieldFromCookieOrLocalStorage("id");

    const handleAcceptOrder = async () => {
        try {
            setsubmitting(true);
            const result = await axios(`https://localhost:44369/api/donhang/update/${orderId}`, {
                method: "POST",
                credentials: 'include',
                mode: 'no-cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json; charset=utf-8',
                },
                data: JSON.stringify({ ...currentOrder, tinhtrangdon: "Đang lấy hàng", manguoigiaohang: idUser })
            })
            if (result?.status === 200) {
                setcurrentOrder(result.data);
                setisSubmittingError(false)
                setdoneSubmitting(true)
            }
            setsubmitting(false);
            setopenSnackbar(true);
            handleClose()
        } catch (error) {
            setopenSnackbar(true);
            setisSubmittingError(true);
            setopen(false);
        }
        finally {
            setsubmitting(false);

        }
    }
    const navigate = useNavigate();

    const handleOnClickGoTracking = () =>
        navigate(`/donhang/${orderId}/tracking`);


    const isInDonHang = manguoigiaohang === idUser
    const isDoneAll = tinhtrangdon === ORDER_STATE.CANCEL || tinhtrangdon === ORDER_STATE.DELIVERED || tinhtrangdon === ORDER_STATE.RETURN;


    return (loading || !currentDetailOrder) ? <Box className="w100 h100">
        <CircularProgress style={{ margin: 'auto' }} />
    </Box>
        : (
            <>
                <Box className="w100 h100 df fdc ">

                    <Box className="df aic">

                        <Paper className="df fdc f1" style={{ padding: 24, margin: 8, minHeight: 250 }} >
                            <Box className="df aic jcsb">

                                <Typography variant="h5" className="mv3">
                                    Thông tin đơn hàng
                                </Typography>
                                {!isDoneAll && <Button variant={doneSubmitting || isInDonHang ? "outlined" : "contained"} disabled={submitting} onClick={() => {
                                    if (doneSubmitting || isInDonHang) {
                                        handleOnClickGoTracking()
                                    }
                                    else handleClickOpen()
                                }}>
                                    {doneSubmitting || isInDonHang ? "Cập nhật tình trạng giao hàng" : "Tiếp nhận đơn hàng"}
                                </Button>}

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
                        </Paper>
                        <Paper className="df fdc f1 h100" style={{ margin: 8, padding: 24, minHeight: 250 }}>
                            <Typography variant="h5" className="mv3">
                                Thông tin khách hàng
                            </Typography>
                            <Box className="df fdc" mt={2}>
                                <Typography >
                                    Họ tên: {hoten_kh}
                                </Typography>
                                <Typography >
                                    Số điện thoại: {sodienthoai_kh}
                                </Typography>
                                <Typography >
                                    Địa chỉ: {sonha_kh}, {phuongxa_kh}, {quanhuyen_kh}, {thanhpho_kh}
                                </Typography>
                            </Box>
                        </Paper>
                    </Box>
                    <Paper className="df fdc f1 " style={{ margin: 8, padding: 24 }}>
                        <Typography variant="h5" className="mv3">
                            Thông tin gian hàng
                        </Typography>
                        <Box className="df fdc" mt={2}>
                            <Typography >
                                Tên gian hàng: {tengianhang}
                            </Typography>
                            <Typography >
                                Lượt theo dõi: {luottheodoi_gh}
                            </Typography>
                            <Typography >
                                Địa chỉ gian hàng: {sonha_gh}, {phuongxa_gh}, {quanhuyen_gh}, {thanhpho_gh}
                            </Typography>
                            <Typography>
                                Mô tả gian hàng: {motagianhang}
                            </Typography>
                        </Box>
                    </Paper>
                    <Typography variant="h5" className="mv3" style={{ margin: "16px auto" }}>
                        Danh sách hàng hóa
                    </Typography>
                    <TableContainer style={{ maxHeight: 400, overflowY: 'auto' }}>
                        <Table stickyHeader size="sm" >
                            <TableHead>
                                <TableRow>
                                    <TableCell>

                                    </TableCell>
                                    {columns.map((column, index) => (
                                        <TableCell key={index} colSpan={index === 1 ? 3 : 1}>
                                            {column}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(currentDetailOrder || []).map((order, index) => {
                                    return <TableRow style={{ background: 'white' }} key={index}>
                                        <TableCell>
                                            {index + 1}
                                        </TableCell>
                                        {dataColumns.map((item, index) => {
                                            return <TableCell key={index} colSpan={item === 'tensanpham' ? 3 : 1} style={{ whiteSpace: 'pre-wrap' }}>
                                                {item === "hinhanh" ? (<img src={order[item]} style={{ height: 100, }} alt={order.tensanpham} />) : (order[item])}
                                            </TableCell>
                                        })}
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle  >
                        Tiếp nhận đơn hàng
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText  >
                            Tiếp nhận đơn hàng này và bắt đầu thực hiện giao hàng ?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Hủy</Button>
                        <Button onClick={handleAcceptOrder} autoFocus disabled={submitting}>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={5000}
                    onClose={() => setopenSnackbar(false)}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert onClose={handleClose} severity={isSubmittingError ? "error" : "success"} sx={{ width: '100%' }}>
                        {isSubmittingError ? "Có lỗi xảy ra, vui lòng thử lại sau" : "Đã đăng ký tiếp nhận đơn hàng thành công"}
                    </Alert>
                </Snackbar>
            </>
        )
}

export default OrderDetailPage