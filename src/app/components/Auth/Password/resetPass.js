import React, { Component } from "react";
import { API } from "../../../../api";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      password2: "",
      showModal: true,
    };
  }

  handleResetPassword = (e) => {
    e.preventDefault();

    if (this.state.password === this.state.password2) {
      const resetData = {
        userId: this.props.history?.location?.state?.user,
        token: this.props.history?.location?.state?.token,
        password: this.state.password,
      };

      axios
        .post(`${API}/password/update`, resetData, {
          headers: {
            "content-type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast(res.data, { type: "success" });
            this.setState({ showModal: false });
            this.props.history.push("/");
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
      <Modal
        show={this.state.showModal}
        size="md"
        centered
        contentClassName="th-auth-signin-modal-content"
        dialogClassName="th-auth-signin-modal-dialog"
      >
        <Modal.Body>
          <div>
            <h3 className="th-auth-heading">Reset Password</h3>
            <p className="th-auth-text mb-md-4 mb-2">Update your password.</p>
            <form onSubmit={this.handleResetPassword}>
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
                      placeholder="New Password"
                    />
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
                      name="password2"
                      value={this.state.password2}
                      onChange={(e) => {
                        this.setState({ [e.target.name]: e.target.value });
                      }}
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>
              </div>
              {/* buttons */}
              <div className="row justify-content-center pb-md-3 pb-2">
                <div className="col-12">
                  <button class="th-signup-btn btn w-100" type="submit">
                    <span> Reset Password </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(ResetPassword);
