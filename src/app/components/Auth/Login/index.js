import React, { Component } from "react";
import CancelIcon from "../../../assets/images/close-square.png";
import { connect } from "react-redux";
import { loginUser } from "../../../../redux/Actions/authActions";
import { setUserLoading } from "../../../../redux/Actions/helperActions";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import ForgotPasswordModal from "../Password/forgotPass";

class Login extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      email: "",
      password: "",
      showForgotPass: false,
    };

    this.state = this.initialState;
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData, this.props.history); // since we handle the redirect within our component,
    //we don't need to pass in this.props.history as a parameter
    this.props.setUserLoading(); // settting loading true to display the loader
    this.props.closeModal();
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-end pt-md-2 ">
          <img
            src={CancelIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={this.props.closeModal}
          />
        </div>
        <h3 className="th-auth-heading">Sign In</h3>
        <p className="th-auth-text mb-md-4 mb-2">
          Welcome back! Please login to your account.
        </p>
        <form onSubmit={this.handleLogin}>
          <div class="row justify-content-center">
            <div class="col-12 pb-md-4 pb-2">
              <div className="th-auth-form-group">
                <input
                  type="text"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                />
                <label>Email</label>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 pb-md-4 pb-2">
              <div className="th-auth-form-group">
                <input
                  type="password"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                />
                <label>Password</label>
              </div>
              <p
                className="th-auth-text2 mt-1 mb-2"
                onClick={() => this.setState({ showForgotPass: true })}
              >
                Forgot password?
              </p>
            </div>
          </div>
          {/* buttons */}
          <div className="row justify-content-center pb-md-3 pb-2">
            <div className="col-12">
              <button class="th-signup-btn btn w-100" type="submit">
                <span> Sign in </span>
              </button>
            </div>
          </div>
        </form>
        <p className="th-auth-text mb-2">
          Don't have an account?{" "}
          <span style={{ color: "#124A53", cursor: "pointer" }}>Sign up</span>
        </p>
        {/* forgot pass modal */}
        <Modal
          show={this.state.showForgotPass}
          onHide={() => this.setState({ showForgotPass: false })}
          size="md"
          centered
          contentClassName="th-auth-signin-modal-content"
          dialogClassName="th-auth-signin-modal-dialog"
          backdrop={false}
        >
          <Modal.Body>
            <ForgotPasswordModal
              closeModal={(val) => {
                this.setState({ showForgotPass: false });
                if (val) this.props.closeModal();
              }}
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

export default connect(mapStateToProps, { loginUser, setUserLoading })(
  withRouter(Login)
);
