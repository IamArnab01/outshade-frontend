import React, { Component } from "react";
import Arrow from "../../assets/images/arrow.svg";
import { Link } from "react-router-dom";

class SideDrawer extends Component {
  render() {
    let drawerClasses = "side_drawer";
    if (this.props.show) {
      drawerClasses = "side_drawer open";
    }

    return (
      <nav className={drawerClasses}>
        <div className="container pt-4">
          <h2 className="pt-2 pb-3 text-center">Welcome !</h2>
          <Link
            to="/home"
            className="d-flex align-items-center sidebar-list"
            onClick={this.props.clicked}
          >
            <p className="sidebar-list-item mb-0" style={{ paddingRight: 8 }}>
              Home
            </p>
            <img src={Arrow} alt="" width={7} />
          </Link>

          <Link
            to="/home"
            className="d-flex align-items-center sidebar-list"
            onClick={this.props.clicked}
          >
            <p className="sidebar-list-item mb-0" style={{ paddingRight: 8 }}>
              Register
            </p>
            <img src={Arrow} alt="" width={7} />
          </Link>

          <Link
            to="/home"
            className="d-flex align-items-center sidebar-list"
            onClick={this.props.clicked}
          >
            <p className="sidebar-list-item mb-0" style={{ paddingRight: 8 }}>
              Login
            </p>
            <img src={Arrow} alt="" width={7} />
          </Link>

          <div className="sidebar-back-div" onClick={this.props.clicked}>
            <div className="pt-2 d-flex align-items-center">
              <img src={Arrow} alt="" width={7} />{" "}
              <p className="mb-0 px-2">Back</p>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default SideDrawer;
