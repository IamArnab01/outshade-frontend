import React, { Component } from "react";
import Arrow from "../../assets/images/arrow.svg";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import SigninModal from "../../components/Auth/Login";
import SignupModal from "../../components/Auth/Register";
import ChangePassModal from "../../components/Auth/Password/changePass";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/Actions/authActions";

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignin: false,
      showSignup: false,
      showChangePass: false,
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

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
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

            {!this.props.auth.isAuthenticated ? (
              <React.Fragment>
                <div
                  className="d-flex align-items-center sidebar-list"
                  onClick={this.handleRegister}
                >
                  <p
                    className="sidebar-list-item mb-0"
                    style={{ paddingRight: 8 }}
                  >
                    Register
                  </p>
                  <img src={Arrow} alt="" width={7} />
                </div>
                <div
                  className="d-flex align-items-center sidebar-list"
                  onClick={this.handleLogin}
                >
                  <p
                    className="sidebar-list-item mb-0"
                    style={{ paddingRight: 8 }}
                  >
                    Login
                  </p>
                  <img src={Arrow} alt="" width={7} />
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Link
                  to="/events"
                  className="d-flex align-items-center sidebar-list"
                  onClick={this.props.closed}
                >
                  <p
                    className="sidebar-list-item mb-0"
                    style={{ paddingRight: 8 }}
                  >
                    Events
                  </p>
                  <img src={Arrow} alt="" width={7} />
                </Link>
                <Link
                  to="/invites"
                  className="d-flex align-items-center sidebar-list"
                  onClick={this.props.closed}
                >
                  <p
                    className="sidebar-list-item mb-0"
                    style={{ paddingRight: 8 }}
                  >
                    Invitations
                  </p>
                  <img src={Arrow} alt="" width={7} />
                </Link>
                <div
                  className="d-flex align-items-center sidebar-list"
                  onClick={() => {
                    this.setState({ showChangePass: true });
                  }}
                >
                  <p
                    className="sidebar-list-item mb-0"
                    style={{ paddingRight: 8 }}
                  >
                    Change Password
                  </p>
                  <img src={Arrow} alt="" width={7} />
                </div>
                <div
                  className="d-flex align-items-center sidebar-list"
                  onClick={this.handleLogout}
                >
                  <p
                    className="sidebar-list-item mb-0"
                    style={{ paddingRight: 8 }}
                  >
                    Logout
                  </p>
                  <img src={Arrow} alt="" width={7} />
                </div>
              </React.Fragment>
            )}

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
        {/* Change Password Modal */}
        <Modal
          show={this.state.showChangePass}
          onHide={() => this.setState({ showChangePass: false })}
          size="md"
          centered
          contentClassName="th-auth-signup-modal-content"
          dialogClassName="th-auth-signup-modal-dialog"
        >
          <Modal.Body>
            <ChangePassModal
              closeModal={() => this.setState({ showChangePass: false })}
            />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(SideDrawer));
