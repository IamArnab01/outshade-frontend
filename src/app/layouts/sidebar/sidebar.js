import React, { Component } from "react";
import Arrow from "../../assets/images/arrow.svg";
import { Link } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import SigninModal from "../../components/Auth/Login";
import SignupModal from "../../components/Auth/Register";

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignin: false,
      showSignup: false,
    };
  }

  handleRegister = () => {
    this.setState({
      showSignup: true,
    });
    this.props.closed();
  };

  handleLogin = () => {
    this.setState({
      showSignin: true,
    });
    this.props.closed();
  };

  render() {
    let drawerClasses = "side_drawer";
    if (this.props.show) {
      drawerClasses = "side_drawer open";
    }

    return (
      <React.Fragment>
        <nav className={drawerClasses}>
          <div className="container pt-4">
            <h2 className="pt-2 pb-3 text-center">Welcome !</h2>
            <Link
              to="/"
              className="d-flex align-items-center sidebar-list"
              onClick={this.props.closed}
            >
              <p className="sidebar-list-item mb-0" style={{ paddingRight: 8 }}>
                Home
              </p>
              <img src={Arrow} alt="" width={7} />
            </Link>

            <div
              className="d-flex align-items-center sidebar-list"
              onClick={this.handleRegister}
            >
              <p className="sidebar-list-item mb-0" style={{ paddingRight: 8 }}>
                Register
              </p>
              <img src={Arrow} alt="" width={7} />
            </div>

            <div
              className="d-flex align-items-center sidebar-list"
              onClick={this.handleLogin}
            >
              <p className="sidebar-list-item mb-0" style={{ paddingRight: 8 }}>
                Login
              </p>
              <img src={Arrow} alt="" width={7} />
            </div>

            <div className="sidebar-back-div" onClick={this.props.closed}>
              <div className="pt-2 d-flex align-items-center">
                <img src={Arrow} alt="" width={7} />{" "}
                <p className="mb-0 px-2">Back</p>
              </div>
            </div>
          </div>
        </nav>
        {/* Signin Modal */}
        <Modal
          show={this.state.showSignin}
          onHide={() => this.setState({ showSignin: false })}
          size="md"
          centered
          contentClassName="th-auth-signin-modal-content"
          dialogClassName="th-auth-signin-modal-dialog"
        >
          <Modal.Body>
            <SigninModal
              closeModal={() => this.setState({ showSignin: false })}
            />
          </Modal.Body>
        </Modal>
        {/* Signup Modal */}
        <Modal
          show={this.state.showSignup}
          onHide={() => this.setState({ showSignup: false })}
          size="md"
          centered
          contentClassName="th-auth-signup-modal-content"
          dialogClassName="th-auth-signup-modal-dialog"
        >
          <Modal.Body>
            <SignupModal
              closeModal={() => this.setState({ showSignup: false })}
            />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default SideDrawer;
