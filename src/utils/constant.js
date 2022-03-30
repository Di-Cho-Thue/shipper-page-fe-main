export const TABLE_FIELDS_ORDER = [
    "Mã đơn hàng",
    "Mã khách hàng",
    "Mã gian hàng",
    "Ngày lập đơn",
    "Tình trạng",
    "Tổng tiền",
    "Hoa hồng",
];

export const DATA_FIELDS_ORDER = [
    "MaDonHang",
    "MaKhachHang",
    "GianHang",
    "NgayLapDon",
    "TinhTrangDon",
    "TongTien",
]


export const SHIPPER_REQUEST_STATE = {
    APPROVED: "Đã duyệt",
    PENDING: "Chưa duyệt",
    REJECTED: "Bị từ chối",
}

export const SHIPPER_ACTIVE_STATE = {
    ON: "Đang hoạt động",
    OFF: "Dừng hoạt động",
    RECESS: "Tạm nghỉ"
}

export const ORDER_STATE = {
    PENDING: 'Chờ xác nhận', PICKUP: 'Đang lấy hàng', DELIVERING: 'Đang giao hàng', DELIVERED: 'Đã giao hàng', CANCEL: 'Đã hủy', RETURN: 'Hoàn trả'
}