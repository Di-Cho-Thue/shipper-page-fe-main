import * as yup from "yup"
import { Controller, useForm } from "react-hook-form";
import { FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography, FormHelperText, Snackbar, Alert, Button } from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker } from "@mui/lab";
import { useState } from "react";
import { yupResolver } from '@hookform/resolvers/yup'
import { APIPost } from "../../../api/axios/method";
import { getUserFieldFromCookieOrLocalStorage, setUserFieldToLocalStorage } from "../../../utils/localStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

const regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
const regexCM = /[0-9]{9}/

const schema = yup.object().shape({
    HoTen_NGH: yup.string().required("Tên không được để trống"),
    CMND_NGH: yup.string().trim().matches(regexCM, "Số CMND không hợp lệ").test('len', 'Chỉ được nhập 9 số', val => val.length === 9).required("CMND không được để trống"),
    NgaySinh_NGH: yup.date("Nhập đúng định dạng ngày").required("Ngày sinh không được để trống"),
    GioiTinh_NGH: yup.string().required("Giới tính không được để trống"),
    SoNha_NGH: yup.string().required("Số nhà không được để trống"),
    PhuongXa_NGH: yup.string().required("Phường xã không được để trống"),
    QuanHuyen_NGH: yup.string().required("Quận huyện không được để trống"),
    ThanhPho_NGH: yup.string().required("Thành phố không được để trống"),
    SoDienThoai_NGH: yup.string().trim().matches(regex, "Số điện thoại không hợp lệ").test('len', 'Chỉ được nhập 10 số', val => val.length === 10).required("Số điện thoại không được để trống"),
    GiayPhepLaiXe: yup.string().url("Hãy nhập vào địa chỉ hình ảnh").required("Hình ảnh giấy phép lái xe không được để trống"),
    GiayXacNhanAmTinh: yup.string().url("Hãy nhập vào địa chỉ hình ảnh").required("Hình ảnh giấy xác nhận âm tính không được để trống"),
})


const SignUpPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        getValues
    } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

    const [openSnackbar, setopenSnackbar] = useState(false);
    const [isSubmittingError, setisSubmittingError] = useState(true);
    const [submitting, setsubmitting] = useState(false);

    const navigate = useNavigate();

    const submit = async (data) => {
        try {
            setsubmitting(true);
            const apiData = { ...data, MaNguoiGiaoHang: makeid(4), DanhGia_NGH: 0, TinhTrangDuyet: "Chưa duyệt", TinhTrangHoatDong: "Dừng hoạt động", GiayPhepLaiXe: data?.GiayPhepLaiXe.slice(0, 10), GiayXacNhanAmTinh: data?.GiayXacNhanAmTinh.slice(0, 10) }
            const result = await APIPost({ url: "/nguoigiaohang/signup", apiData })
            if (result.status === 200 || result.status === 201) {
                const username = getUserFieldFromCookieOrLocalStorage("username");

                const result2 = await axios(`http://localhost:8080/api/auth/update`, {
                    method: "POST",
                    credentials: 'include',
                    mode: 'no-cors',
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    data: JSON.stringify({ username: username, id: result.data.MaNguoiGiaoHang })
                })

                if (result2.status === 200 || result2.status === 201) {
                    setUserFieldToLocalStorage("id", result2.data.id);
                    setisSubmittingError(false)
                    navigate("/deliver")
                }
                else throw new Error("Lỗi khi đăng ký")


            }
            else {
                throw new Error("Lỗi khi đăng ký")
            }
            // const result1 = await APIGet({ url: "/nguoigiaohang/99224d0" })

            // const result2 = await APIPost({
            //     url: "/nguoigiaohang/update/99224d0", apiData: {
            //         ...(result1.data || {}),
            //         TinhTrangDuyet: SHIPPER_REQUEST_STATE.APPROVED,
            //         TinhTrangHoatDong: SHIPPER_ACTIVE_STATE.ON,
            //         TenDangNhap: "hihi123",
            //         MatKhau: "123456",
            //     }
            // })
        } catch (error) {
            setisSubmittingError(true)

        }
        finally {
            setopenSnackbar(true)
            setsubmitting(false);

        }
    }

    return (
        <Box style={{ width: "100vw", padding: 100 }} className="df aic jcc">
            <Paper elevation={5} component={'form'} onSubmit={handleSubmit(submit)} style={{ padding: 24, maxWidth: 1000 }} className="df fdc aic w100">
                <Typography variant="h5" component="h3">
                    Phiều đăng ký giao hàng
                </Typography>
                <Box my={3} className="df aic fdc w100">
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        helperText={errors?.HoTen_NGH?.message || ""}
                        error={Boolean(errors?.HoTen_NGH)}
                        placeholder="Họ tên của bạn"
                        label="Họ tên"
                        {...register("HoTen_NGH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.CMND_NGH?.message || ""}
                        error={Boolean(errors?.CMND_NGH)}
                        placeholder="Nhập số Chứng minh nhân dân"
                        label="CMND"
                        {...register("CMND_NGH")}
                    />
                    <Controller
                        control={control}
                        name="NgaySinh_NGH"
                        render={({
                            field: { onChange, onBlur, value, HoTen_NGH, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                            formState,
                        }) => {
                            return (
                                <DatePicker
                                    helperText={
                                        invalid ? error?.message || "Vui lòng chọn ngày sinh" : ""
                                    }
                                    onBlur={onBlur}
                                    onFocus={() => { }}
                                    error={!!invalid}
                                    inputVariant="outlined"
                                    color="primary"
                                    value={value || null}
                                    onChange={(date) => {
                                        onChange(date);
                                    }}
                                    inputFormat="dd/MM/yyyy"
                                    placeholder="Ngày sinh"
                                    label="Ngày sinh"
                                    renderInput={(props) => <TextField style={{
                                        width: "100%",
                                        ...props.style, margin: "8px 0px",
                                    }} {...props} />}
                                />
                            );
                        }}
                    />
                    <Controller
                        control={control}
                        name="GioiTinh_NGH"
                        render={({
                            field: { onChange, onBlur, value, ref },
                            fieldState: { invalid, isTouched, isDirty, error },
                            formState,
                        }) => {
                            return (
                                <FormControl error={!!invalid} fullWidth color="primary"
                                    style={{ margin: "8px 0px" }}

                                >
                                    <FormLabel id="demo-row-radio-buttons-group-label" >Giới tính</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        onChange={value => {

                                            onChange(value.target.defaultValue)
                                        }}
                                        value={value || ""}
                                        defaultValue={"Nam"}

                                    >
                                        <FormControlLabel value="Nam" control={<Radio />} label="Nam" />
                                        <FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
                                    </RadioGroup>
                                    <FormHelperText>{error}</FormHelperText>
                                </FormControl>
                            );
                        }}
                    />

                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.SoNha_NGH?.message || ""}
                        error={Boolean(errors?.SoNha_NGH)}
                        placeholder="Số nhà của bạn"
                        {...register("SoNha_NGH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.PhuongXa_NGH?.message || ""}
                        error={Boolean(errors?.PhuongXa_NGH)}
                        placeholder="Phường xã của bạn"
                        {...register("PhuongXa_NGH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.QuanHuyen_NGH?.message || ""}
                        error={Boolean(errors?.QuanHuyen_NGH)}
                        placeholder="Quận huyện của bạn"
                        {...register("QuanHuyen_NGH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.ThanhPho_NGH?.message || ""}
                        error={Boolean(errors?.ThanhPho_NGH)}
                        placeholder="Thành phố của bạn"
                        {...register("ThanhPho_NGH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.SoDienThoai_NGH?.message || ""}
                        error={Boolean(errors?.SoDienThoai_NGH)}
                        placeholder="Số điện thoại của bạn"
                        {...register("SoDienThoai_NGH")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.GiayPhepLaiXe?.message || ""}
                        error={Boolean(errors?.GiayPhepLaiXe)}
                        placeholder="Link hình ảnh giấy phép lái xe của bạn"
                        {...register("GiayPhepLaiXe")}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        style={{ margin: "8px 0px" }}
                        autoComplete="off"
                        helperText={errors?.GiayXacNhanAmTinh?.message || ""}
                        error={Boolean(errors?.GiayXacNhanAmTinh)}
                        placeholder="Link hình ảnh giấy xác nhận âm tính của bạn"
                        {...register("GiayXacNhanAmTinh")}
                    />
                </Box>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={submitting || Object.keys(errors).length > 0 || Object.keys(getValues()).length === 0}
                    type="submit"
                >
                    Đăng ký
                </Button>
            </Paper>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setopenSnackbar(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={() => setopenSnackbar(false)} severity={isSubmittingError ? "error" : "success"} sx={{ width: '100%' }}>
                    {isSubmittingError ? "Có lỗi xảy ra, vui lòng thử lại sau!" : "Đã đăng ký giao hàng thành công!"}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default SignUpPage;