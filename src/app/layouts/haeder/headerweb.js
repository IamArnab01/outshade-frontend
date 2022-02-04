import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HeaderWeb extends Component {
  render() {
    return (
      <div className="header shadow-sm">
        <div className="container">
          <div className="row">
            <div className="col-6 d-flex justify-content-between">
              <img src={this.props.Logo} alt="" width={100} />
            </div>
            <div className="col-6 d-flex align-items-center justify-content-end">
              <NavLink
                to="/"
                exact={true}
                className="px-4 header-link"
                activeClassName="header-active-link"
              >
                Home
              </NavLink>
              <NavLink
                to="/register"
                exact={true}
                className="px-4 header-link"
                activeClassName="header-active-link"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                exact={true}
                className="px-4 header-link"
                activeClassName="header-active-link"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HeaderWeb;
