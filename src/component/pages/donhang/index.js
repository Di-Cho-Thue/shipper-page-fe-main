import Table, { TableRow } from "../../units/Table";
import { ORDER_STATE, TABLE_FIELDS_ORDER } from "../../../utils/constant";
import { useEffect, useState } from "react";
import { APIGet, SOURCE } from "../../../api/axios/method";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getQuesDateString } from "../../../utils/date"
import { Box } from "@mui/system";
import { getUserFieldFromCookieOrLocalStorage } from "../../../utils/localStorage";

export const isDoneAll = (tinhtrangdon) => tinhtrangdon === ORDER_STATE.CANCEL || tinhtrangdon === ORDER_STATE.DELIVERED || tinhtrangdon === ORDER_STATE.RETURN;


const DeliveryPage = () => {
    const [orders, setorders] = useState([]);
    const [loading, setloading] = useState(false);

    const id = getUserFieldFromCookieOrLocalStorage("id");

    useEffect(() => {
        setloading(true);
        APIGet({ url: `/donhang?shipper=${id}`, source: SOURCE.CSHARP }).then((result) => {
            setorders(result?.data || [])
            setloading(false);
        })
    }, []);

    const navigate = useNavigate();
    const handleOnClickDetail = (idDonHang) =>
        navigate(`/donhang/${idDonHang}/detail`);

    const tableRows = (orders.filter(order => !order.manguoigiaohang)).map((order, index) => {

        let data = [];
        [
            "madonhang",
            "makhachhang",
            "hinhthucthanhtoan",
            "ngaylapdon",
            "tinhtrangdon",
            "tongtien",
        ].forEach((item) => {
            if (item === 'ngaylapdon') {
                data.push(getQuesDateString(order[item]))
                return
            }
            data.push(order[item]);
        });
        return (
            <TableRow key={index} data={data}>
                <td>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleOnClickDetail(order["madonhang"])}
                    >
                        Chi ti???t
                    </Button>
                </td>
            </TableRow>
        );
    });


    const tableRows2 = (orders.filter(order => !isDoneAll(order.tinhtrangdon))).map((order, index) => {

        let data = [];
        [
            "madonhang",
            "makhachhang",
            "hinhthucthanhtoan",
            "ngaylapdon",
            "tinhtrangdon",
            "tongtien",
        ].forEach((item) => {
            if (item === 'ngaylapdon') {
                data.push(getQuesDateString(order[item]))
                return
            }
            data.push(order[item]);
        });
        return (
            <TableRow key={index} data={data}>
                <td>
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={() => handleOnClickDetail(order["madonhang"])}
                    >
                        Chi ti???t
                    </Button>
                </td>
            </TableRow>
        );
    });

    return loading ? (<CircularProgress />) : tableRows.length === 0 ? (
        <Typography variant="h6" align="center">
            Kh??ng c?? ????n h??ng n??o
        </Typography>
    ) : (
        <>
            <Box mb={4}>
                <Typography variant="h5" component="h2" align="center" >
                    Danh s??ch ????n h??ng c?? th??? nh???n
                </Typography>
            </Box>
            <Table columns={TABLE_FIELDS_ORDER.slice(0, TABLE_FIELDS_ORDER.length - 1)} data={tableRows} />
            <Box my={4}>
                <Typography variant="h5" component="h2" align="center" >
                    Danh s??ch ????n h??ng ??ang ti???p nh???n
                </Typography>
            </Box>
            <Table columns={TABLE_FIELDS_ORDER.slice(0, TABLE_FIELDS_ORDER.length - 1)} data={tableRows2} />
        </>
    )
}

export default DeliveryPage;