import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { APIPost, SOURCE } from "../../../api/axios/method";
import { setUserFieldToLocalStorage } from "../../../utils/localStorage";
import logo from "../../../assets/materials/images/logo.png";
import { Link, useNavigate } from "react-router-dom";

const SignInPage = () => {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");

    const navigate = useNavigate();

    const handleOnClickSignIn = async () => {
        try {
            setloading(true);
            const result = await APIPost({ url: "/auth/signin", source: SOURCE.JAVA, apiData: { username, password, role: "ROLE_SHIPPER" } });
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

    useEffect(() => {
        setUserFieldToLocalStorage("id", null);
        setUserFieldToLocalStorage("username", null);
        setUserFieldToLocalStorage("role", null);
    }, [])

    return (
        <Box style={{ width: "100vw", height: "100vh" }} className="df aic jcc">

            <Paper className="df aic fdc jcc" style={{ width: 500, height: 500, padding: 24 }} elevation={5} >
                <img src={logo} alt="ĐI CHỢ HỘ" style={{ height: 100, marginLeft: 37.5 }} />

                <Typography variant="h5" component="h2" className="mt-5 sb" align="center">
                    ĐĂNG NHẬP
                </Typography>
                <TextField value={username} fullWidth label="Tên đăng nhập" placeholder="Nhập tên đăng nhập của bạn" onChange={(e) => setusername(e.target.value)} style={{
                    marginTop: 32,
                    marginBottom: 16
                }} />
                <TextField value={password} fullWidth label="Mật khẩu" type={"password"} placeholder="Nhập mật khẩu của bạn" onChange={(e) => setpassword(e.target.value)} style={{
                    marginBottom: 32
                }} />
                {error && <Typography variant="body2" style={{ marginBottom: 8 }} align="center">{error}</Typography>}
                <Box className="df aic jcsb w100 ">
                    <Link to={"/register"}>
                        Chưa có tài khoản? Tạo mới ngay
                    </Link>
                    <Button onClick={handleOnClickSignIn} color="primary" disabled={loading} variant="contained">Đăng nhập</Button>
                </Box>
            </Paper>
        </Box>
    )
}

export default SignInPage;