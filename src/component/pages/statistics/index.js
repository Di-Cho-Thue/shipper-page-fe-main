import Table, { TableRow } from "../../units/Table";
import classnames from "classnames";

import { useEffect, useState } from "react";
import { APIGet } from "../../../api/axios/method";
import { Button, CircularProgress, Divider, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { StatusCodes } from "http-status-codes";
import { getUserFieldFromCookieOrLocalStorage } from "../../../utils/localStorage";

const OverviewCard = ({ text, number, Icon, className }) => {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className={classnames("overview-item", className)}>
        <div className="overview__inner">
          <div className="overview-box clearfix">
            <div className="icon">{Icon}</div>
            <div className="text">
              <h2>{number}</h2>
              <span>{text}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatisticsPage = () => {
  const columns = [
    "Mã đơn hàng",
    "Mã khách hàng",
    "Mã gian hàng",
    "Ngày lập đơn",
    "Tình trạng",
    "Tổng tiền",
    "Hoa hồng",
  ];
  const [orders, setorders] = useState([]);
  const [hoaHongMonth, sethoaHongMonth] = useState(0);
  const [loading, setloading] = useState(false);

  const id = getUserFieldFromCookieOrLocalStorage("id");

  useEffect(() => {
    async function fetchData() {
      setloading(true);
      await APIGet({ url: `/donhang/shipper/${id}` }).then((result) => {
        if (result.status === StatusCodes.OK) {
          setorders(result?.data || []);
        }
      });
      await APIGet({
        url:
          `/donhang/shipper/hoahong/sumMonth/${id}/${new Date().getUTCMonth() + 1}/${new Date().getUTCFullYear()}`,
      }).then((result) => {
        if (result.status === StatusCodes.OK) {
          sethoaHongMonth(result?.data || 0);
        }
      });
      setloading(false);
    }
    fetchData();
  }, []);

  const tableRows = orders.map((order, index) => {
    const toGetValue = [
      "MaDonHang",
      "MaKhachHang",
      "GianHang",
      "NgayLapDon",
      "TinhTrangDon",
      "TongTien",
      "HoaHong",
    ];
    let data = [];
    toGetValue.forEach((item) => {
      data.push(order[item]);
    });
    return (
      <TableRow key={index} data={data}>
        <td>
          <Button
            color="primary"
            variant="contained"
            onClick={() => handleOnClickDetail(order["MaDonHang"])}
          >
            Chi tiết
          </Button>
        </td>
      </TableRow>
    );
  });

  const navigate = useNavigate();
  const handleOnClickDetail = (idDonHang) =>
    navigate(`/donhang/${idDonHang}/detail`);
  const successOrder = orders.filter(
    (order) =>
      order["TinhTrangDon"] === "Đã giao hàng" ||
      order["TinhTrangDon"] === "Hoàn trả"
  );
  const sumHoaHong = orders.reduce((acc, cur) => acc + cur["HoaHong"], 0);
  const countNoRepeat = (array) => {
    let result = [];
    array.forEach((item) => {
      if (!result.includes(item)) {
        result.push(item);
      }
    });
    return result.length;
  };

  const overviewItem = [
    {
      text: "Tổng thu nhập",
      number: sumHoaHong,
      Icon: <i className="fas fa-dollar-sign"></i>,
      className: "overview-item--c1",
    },
    {
      text: "Số khách hàng",
      number: countNoRepeat(orders.map((order) => order["MaKhachHang"])),
      Icon: <i className="fas fa-user-friends"></i>,
      className: "overview-item--c2",
    },
    {
      text: "Tổng đơn hàng",
      number: orders.length,
      Icon: <i className="fas fa-shopping-cart"></i>,
      className: "overview-item--c3",
    },
    {
      text: "Giao thành công",
      number: successOrder.length,
      Icon: <i className="fas fa-chart-line"></i>,
      className: "overview-item--c4",
    },
  ];

  return loading ? (
    <div className="w100 h100 df fdc aic jcc" >
      <CircularProgress />
      <Typography variant="h5" component="h2" className="mt-5" align="center">
        Đang tải...
      </Typography>
    </div>
  ) : (
    <>
      <div className="row">
        <div className="col-md-12">
          <div className="overview-wrap df aic jcsb">
            <h2 className="title-1">Thống kê</h2>
            <Box className="row m-t-25 df aic " m={0} pl={2}  >
              <h4 className="title-3">Doanh thu tháng này</h4>
              <Box className="overview-item overview-item--c1 df aic jcc" style={{ background: '#71a7c6' }} mb={0} p={2} ml={4}  >
                <Typography
                  variant="h6"
                  component="h6"
                  color={"HighlightText"}
                  className=""
                >
                  {`${hoaHongMonth} đ`}
                </Typography>
              </Box>
            </Box>
          </div>
        </div>
      </div>

      <div className="row m-t-25 m-b-25">
        {overviewItem.map((item, index) => (
          <OverviewCard
            className={item.className}
            key={index}
            text={item.text}
            number={item.number}
            Icon={item.Icon}
            chartProps={item.chartProps}
          />
        ))}
      </div>
      <Divider />
      <Box className="df aic jcc w100">
        <h4 className="title-5" style={{ marginBottom: 24, marginTop: 50 }}>Danh sách đơn hàng đã tiếp nhận</h4>
      </Box>
      <Table columns={columns} data={tableRows} />
    </>
  );
};

export default StatisticsPage;
