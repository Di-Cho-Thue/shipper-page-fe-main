import React from "react";
import { Link } from "react-router-dom";

const AppHeaderMobile = () => {
  return (
    <header className="header-mobile d-block d-lg-none">
      <div className="header-mobile__bar">
        <div className="container-fluid">
          <div className="header-mobile-inner">
            <Link className="logo" to="index.html">
              <img src="images/icon/logo.png" alt="CoolAdmin" />
            </Link>
            <button className="hamburger hamburger--slider" type="button">
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <nav className="navbar-mobile">
        <div className="container-fluid">
          <ul className="navbar-mobile__list list-unstyled">
            <li className="has-sub">
              <Link className="js-arrow" to="#">
                <i className="fas fa-tachometer-alt" />
                Dashboard
              </Link>
              <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                <li>
                  <Link to="index.html">Dashboard 1</Link>
                </li>
                <li>
                  <Link to="index2.html">Dashboard 2</Link>
                </li>
                <li>
                  <Link to="index3.html">Dashboard 3</Link>
                </li>
                <li>
                  <Link to="index4.html">Dashboard 4</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="chart.html">
                <i className="fas fa-chart-bar" />
                Charts
              </Link>
            </li>
            <li>
              <Link to="table.html">
                <i className="fas fa-table" />
                Tables
              </Link>
            </li>
            <li>
              <Link to="form.html">
                <i className="far fa-check-square" />
                Forms
              </Link>
            </li>
            <li>
              <Link to="calendar.html">
                <i className="fas fa-calendar-alt" />
                Calendar
              </Link>
            </li>
            <li>
              <Link to="map.html">
                <i className="fas fa-map-marker-alt" />
                Maps
              </Link>
            </li>
            <li className="has-sub">
              <Link className="js-arrow" to="#">
                <i className="fas fa-copy" />
                Pages
              </Link>
              <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                <li>
                  <Link to="login.html">Login</Link>
                </li>
                <li>
                  <Link to="register.html">Register</Link>
                </li>
                <li>
                  <Link to="forget-pass.html">Forget Password</Link>
                </li>
              </ul>
            </li>
            <li className="has-sub">
              <Link className="js-arrow" to="#">
                <i className="fas fa-desktop" />
                UI Elements
              </Link>
              <ul className="navbar-mobile-sub__list list-unstyled js-sub-list">
                <li>
                  <Link to="button.html">Button</Link>
                </li>
                <li>
                  <Link to="badge.html">Badges</Link>
                </li>
                <li>
                  <Link to="tab.html">Tabs</Link>
                </li>
                <li>
                  <Link to="card.html">Cards</Link>
                </li>
                <li>
                  <Link to="alert.html">Alerts</Link>
                </li>
                <li>
                  <Link to="progress-bar.html">Progress Bars</Link>
                </li>
                <li>
                  <Link to="modal.html">Modals</Link>
                </li>
                <li>
                  <Link to="switch.html">Switchs</Link>
                </li>
                <li>
                  <Link to="grid.html">Grids</Link>
                </li>
                <li>
                  <Link to="fontawesome.html">Fontawesome Icon</Link>
                </li>
                <li>
                  <Link to="typo.html">Typography</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default AppHeaderMobile;
