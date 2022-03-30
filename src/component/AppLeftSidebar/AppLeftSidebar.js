import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/materials/images/logo.png"


const ROUTE = {
  deliver: { url: "/deliver", title: "Tiếp nhận đơn hàng" },
  history: { url: "/history", title: "Lịch sử" },
  statistics: { url: "/statistics", title: "Thống kê" },
}

const AppLeftSidebar = () => {

  const location = useLocation();
  return (
    <aside className="menu-sidebar d-none d-lg-block">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="ĐI CHỢ HỘ" style={{ height: 100, marginLeft: 37.5 }} />
        </Link>
      </div>
      <div className="menu-sidebar__content ">
        <PerfectScrollbar>
          <nav className="navbar-sidebar">
            <ul className="list-unstyled navbar__list">
              {Object.keys(ROUTE).map((key, index) => {
                const route = ROUTE[key];
                return (
                  <li className={`nav-item ${location.pathname === route.url ? "active" : ""}`} key={index}>
                    <Link to={route.url} className="nav-link">
                      <i className="fas fa-table"></i>
                      {route.title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </PerfectScrollbar>
      </div>
    </aside>
  );
};

export default AppLeftSidebar;
