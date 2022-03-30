import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIPost, SOURCE } from "../../../api/axios/method";
import { setUserFieldToLocalStorage } from "../../../utils/localStorage";
import logo from "../../../assets/materials/images/logo.png";

const RegisterPage = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const navigate = useNavigate()

    const handleOnClickSignIn = async () => {
        try {
            setloading(true);
            const result = await APIPost({ url: "/auth/signup", source: SOURCE.JAVA, apiData: { username, password, role: "ROLE_SHIPPER" } });
            if (result.status === 200) {
                setUserFieldToLocalStorage("id", result.data.id);
                setUserFieldToLocalStorage("username", result.data.username);
                setUserFieldToLocalStorage("role", result.data.role);
                navigate("/deliver");
            }
        } catch (error) {
            seterror(error);
        } finally {
            setloading(false);
        }
    }

    return (
        <Box style={{ width: "100vw", height: "100vh" }} className="df aic jcc">

            <Paper className="df aic fdc jcc" style={{ width: 500, height: 500, padding: 24 }} elevation={5} >
                <img src={logo} alt="ĐI CHỢ HỘ" style={{ height: 100, marginLeft: 37.5 }} />

                <Typography variant="h5" component="h2" className="mt-5 sb" align="center">
                    ĐĂNG KÝ
                </Typography>
                <TextField value={username} fullWidth label="Tên đăng nhập" placeholder="Nhập tên đăng nhập của bạn" onChange={(e) => setusername(e.target.value)} style={{
                    marginTop: 32,
                    marginBottom: 16
                }} />
                <TextField value={password} fullWidth label="Mật khẩu" type={'password'} placeholder="Nhập mật khẩu của bạn" onChange={(e) => setpassword(e.target.value)} style={{
                    marginBottom: 32
                }} />
                {error && <Typography variant="body2" style={{ marginBottom: 8 }} align="center">{error}</Typography>}
                <Box className="df aic jcc w100 ">

                    <Button onClick={handleOnClickSignIn} color="primary" disabled={loading} variant="contained">Đăng ký</Button>
                </Box>
            </Paper>
        </Box>)
}

export default RegisterPage;