import React, { Component } from "react";
import Menu from "../../assets/images/menu.svg";
import { Link } from "react-router-dom";
import SideDrawer from "../sidebar/sidebar";
import BackDrop from "../sidebar/backdrop";

class HeaderMob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideDrawerOpen: false,
    };
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickhandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  closeSideDrawer = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <BackDrop click={this.backdropClickhandler} />;
    }

    return (
      <div className="header shadow-sm">
        <div className="d-flex justify-content-between align-items-center">
          <img
            src={Menu}
            alt="Menu"
            onClick={this.drawerToggleClickHandler}
            width={25}
          />
          <Link to="/">
            <img src={this.props.Logo} alt="logo" width={48} />
          </Link>
        </div>
        <SideDrawer
          show={this.state.sideDrawerOpen}
          clicked={this.drawerToggleClickHandler}
          Logo={this.props.Logo}
        />
        {backdrop}
      </div>
    );
  }
}

export default HeaderMob;
