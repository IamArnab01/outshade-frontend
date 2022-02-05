import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CancelIcon from "../../../assets/images/close-square.png";
import { API } from "../../../../api";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }

  handleForgotPass = (e) => {
    e.preventDefault();
    const forgotData = { email: this.state.email };
    axios
      .post(`${API}/password/reset`, forgotData, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        let resetPassData = res.data;
        this.props.history.push({
          pathname: "/user/update/password",
          state: resetPassData,
        });
        this.props.closeModal(1);
      })
      .catch((err) => {
        console.log(err);
        toast(err.response.data, { type: "warning" });
      });
  };

  render() {
    return (
      <div className="th-auth-forgot-pass-box">
        <div className="d-flex justify-content-end pt-md-3">
          <img
            src={CancelIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={this.props.closeModal}
          />
        </div>
        <h3 className="th-auth-heading mb-3">Forgot Password</h3>
        <p className="th-auth-text mb-md-5 mb-3">
          Enter your email to reset password.
        </p>
        <form onSubmit={this.handleForgotPass}>
          <div class="row justify-content-center">
            <div class="col-12 pb-5">
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
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center pb-md-3 pb-2">
            <div className="col-12">
              <button class="th-signup-btn btn w-100" type="submit">
                <span> Generate reset token</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(ForgotPassword);
