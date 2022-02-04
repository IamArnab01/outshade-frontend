import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import SigninModal from "../../components/Auth/Login";
import SignupModal from "../../components/Auth/Register";
import { connect } from "react-redux";
import { logoutUser } from "../../../redux/Actions/authActions";

class HeaderWeb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignin: false,
      showSignup: false,
    };
  }

  handleLogout = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    return (
      <React.Fragment>
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
                {!this.props.auth.isAuthenticated ? (
                  <React.Fragment>
                    <div
                      className="px-4 th-header-signup-txt"
                      onClick={() => this.setState({ showSignup: true })}
                    >
                      <p className="m-0">Register</p>
                    </div>
                    <div
                      className="px-4 th-header-signin-txt"
                      onClick={() => this.setState({ showSignin: true })}
                    >
                      <p className="m-0">Login</p>
                    </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <NavLink
                      to="/events"
                      exact={true}
                      className="px-4 header-link"
                      activeClassName="header-active-link"
                    >
                      Events
                    </NavLink>
                    <NavLink
                      to="/invites"
                      exact={true}
                      className="px-4 header-link"
                      activeClassName="header-active-link"
                    >
                      Invitations
                    </NavLink>
                    <NavLink
                      to="/profile"
                      exact={true}
                      className="px-4 header-link"
                      activeClassName="header-active-link"
                    >
                      Profile
                    </NavLink>
                    <div
                      className="px-4 th-header-signup-txt"
                      onClick={this.handleLogout}
                    >
                      <p className="m-0">Logout</p>
                    </div>
                  </React.Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withRouter(HeaderWeb));
