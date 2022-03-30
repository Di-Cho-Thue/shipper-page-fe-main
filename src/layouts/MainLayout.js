import cookies from "js-cookie";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppHeaderDesktop from "../component/AppHeaderDesktop/AppHeaderDesktop";
import AppHeaderMobile from "../component/AppHeaderMobile/AppHeaderMobile";
import AppLeftSidebar from "../component/AppLeftSidebar/AppLeftSidebar";
import { getUserFieldFromCookieOrLocalStorage } from "../utils/localStorage";

const MainLayout = (props) => {

  const navigate = useNavigate()
  const location = useLocation();

  useEffect(() => {
    const username = getUserFieldFromCookieOrLocalStorage("username");
    const id = getUserFieldFromCookieOrLocalStorage("id");
    if ((username === "null" || !username) && !(location.pathname.includes("signin") || location.pathname.includes("register"))) navigate("/signin")
    if ((id === "null" || !username) && !(location.pathname.includes("signin") || location.pathname.includes("register"))) navigate("/signup")
  }, [location.pathname, navigate]);



  return (location.pathname.includes("signin") || location.pathname.includes("register") || location.pathname.includes("signup")) ? props.children : (
    <div className="page-wrapper">
      {/* HEADER MOBILE*/}
      <AppHeaderMobile />
      {/* END HEADER MOBILE*/}
      {/* MENU SIDEBAR*/}
      <AppLeftSidebar />
      {/* END MENU SIDEBAR*/}
      {/* PAGE CONTAINER*/}
      <div className="page-container">
        {/* HEADER DESKTOP*/}
        <AppHeaderDesktop />
        {/* HEADER DESKTOP*/}
        {/* MAIN CONTENT*/}
        <div className="main-content">
          <div className="section__content section__content--p30">
            <div className="container-fluid">{props.children}</div>
          </div>
        </div>
        {/* END MAIN CONTENT*/}
        {/* END PAGE CONTAINER*/}
      </div>
    </div>
  );
};

export default MainLayout;
