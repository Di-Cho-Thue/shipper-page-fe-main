import React from "react";

const AppHeaderDesktop = () => {
  return (
    <header className="header-desktop">
      <div className="section__content section__content--p30">
        <div className="container-fluid">
          <div className="header-wrap">
            <form className="form-header" method="POST">
              <input
                className="au-input au-input--xl"
                type="text"
                name="search"
                placeholder="Search for datas & reports..."
              />
              <button className="au-btn--submit" type="submit">
                <i className="zmdi zmdi-search" />
              </button>
            </form>

          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeaderDesktop;
