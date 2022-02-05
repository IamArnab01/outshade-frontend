import React, { Component } from "react";
import CancelIcon from "../../../assets/images/close-square.png";
import { connect } from "react-redux";
import { registerUser } from "../../../../redux/Actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.initialState = {
      name: "",
      email: "",
      password: "",
    };

    this.state = this.initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    this.props.registerUser(userData);

    this.props.closeModal();
  };

  render() {
    return (
      <React.Fragment>
        <div className="d-flex justify-content-end pt-md-2">
          <img
            src={CancelIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={this.props.closeModal}
          />
        </div>
        <h3 className="th-auth-heading mb-1">Sign Up</h3>
        <p className="th-auth-text mb-md-4 mb-2">
          Welcome! Please Sign up to create your account.
        </p>
        <form onSubmit={this.handleSubmit}>
          <div class="row justify-content-center">
            <div class="col-12  pb-md-4 pb-2">
              <div className="th-auth-form-group">
                <input
                  type="text"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => {
                    this.setState({ [e.target.name]: e.target.value });
                  }}
                />
                <label>Name</label>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12  pb-md-4 pb-2">
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
            <div class="col-12  pb-md-4 pb-2">
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
            </div>
          </div>
          {/* buttons */}
          <p className="th-signup-warning-txt text-center mt-1 mb-3">
            By clicking "Sign up", I agree to Outshade Digital <span> TOS</span>{" "}
            and <span>Privacy Policy</span>.
          </p>
          <div className="row justify-content-center pb-md-3 pb-2">
            <div className="col-12">
              <button class="th-signup-btn btn w-100" type="submit">
                <span> Sign up </span>
              </button>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { registerUser })(Register);
