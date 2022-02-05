import React, { Component } from "react";
import CancelIcon from "../../../assets/images/close-square.png";
import { API } from "../../../../api";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { logoutUser } from "../../../../redux/Actions/authActions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    };
  }

  handleChangePassword = (e) => {
    e.preventDefault();

    if (this.state.confirmPassword === this.state.newPassword) {
      const resetData = {
        userId: this.props.auth.user._id,
        oldPassword: this.state.oldPassword,
        newPassword: this.state.newPassword,
      };

      axios
        .patch(`${API}/password/change`, resetData, {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast(res.data, { type: "success" });
            this.props.logoutUser(this.props.history);
          }
        })
        .catch((err) => {
          console.log(err);
          toast(err.response.data, { type: "warning" });
        });
    } else {
      toast("Password does not match, try again.", { type: "warning" });
    }
  };

  render() {
    return (
      <div>
        <div className="d-flex justify-content-end pt-md-3">
          <img
            src={CancelIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={this.props.closeModal}
          />
        </div>
        <h3 className="th-auth-heading mb-4">Change Password</h3>
        <form onSubmit={this.handleChangePassword}>
          <div class="row justify-content-center">
            <div class="col-12 pb-4">
              <div className="th-auth-form-group">
                <input
                  type="password"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="oldPassword"
                  value={this.state.oldPassword}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                  placeholder="Old Password"
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 pb-4">
              <div className="th-auth-form-group">
                <input
                  type="password"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="newPassword"
                  value={this.state.newPassword}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                  placeholder="New Password"
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 pb-2">
              <div className="th-auth-form-group">
                <input
                  type="password"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="confirmPassword"
                  value={this.state.confirmPassword}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                  placeholder="Confirm New Password"
                />
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className="row justify-content-center pb-3 pt-4">
            <div className="col-12">
              <button class="th-signup-btn btn w-100" type="submit">
                <span> Change Password </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(
  withRouter(ResetPassword)
);
