import "./App.css";

import "./assets/materials/css/theme.css";
import "./assets/materials/vendor/mdi-font/css/material-design-iconic-font.min.css";

import "react-perfect-scrollbar/dist/css/styles.css";

import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HistoryPage from "./component/pages/history";
import StatisticPage from "./component/pages/statistics";
import { themeOptions } from "./assets/mui/theme";
import { ThemeProvider } from "@emotion/react";
import "./assets/materials/loader"
import { CssBaseline } from "@mui/material";
import DeliveryPage from "./component/pages/donhang";
import OrderDetailPage from "./component/pages/donhang/detail";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import SignUpPage from "./component/pages/signup";
import TrackingPage from "./component/pages/tracking";
import SignInPage from "./component/pages/signin";
import RegisterPage from "./component/pages/register";

function App() {


  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={themeOptions}>
        <CssBaseline />
        <BrowserRouter>
          <div>
            {/* Required meta tags*/}
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            {/* Main CSS*/}
            <MainLayout>
              <Routes>
                <Route path="/history" element={<HistoryPage />}></Route>
                <Route path="/statistics" element={<StatisticPage />}></Route>
                <Route path="/deliver" element={<DeliveryPage />}></Route>
                <Route path="/donhang/:orderId/detail" element={<OrderDetailPage />}></Route>
                <Route path="/signup" element={<SignUpPage />}></Route>
                <Route path="/donhang/:orderId/tracking" element={<TrackingPage />}></Route>
                <Route path="/signin" element={<SignInPage />}></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
              </Routes>
            </MainLayout>

          </div>
        </BrowserRouter>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
