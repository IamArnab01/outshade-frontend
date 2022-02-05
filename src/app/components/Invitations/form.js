import React, { Component } from "react";
import Select from "react-select";
import CancelIcon from "../../assets/images/close-square.png";
import { connect } from "react-redux";
import { API } from "../../../api";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const customStyles = {
  control: () => ({
    border: "1px solid #707070",
    borderLeft: "5px solid #2eabbf",
    borderRight: "1px solid #c1bbbb",
    borderTop: "1px solid #c1bbbb",
    borderBottom: "1px solid #c1bbbb",
    borderRadius: 6,
    alignItems: "center",
    backgroundColor: "#fff",
    cursor: "default",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    minHeight: "40px",
    outline: "0!important",
    position: "relative",
    transition: "all 100ms",
    boxSizing: "border-box",
    color: "#707070",
    fontFamily: "Poppins",
    fontSize: 18,
  }),
};

class InvitationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: "",
      inviteeId: "",
      message: "",
      usersData: [],
      eventsData: [],
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.fetchEvents();
    this.fetchUsers();
  }

  fetchEvents = (params = {}) => {
    axios
      .get(`${API}/event/getAll/${this.props?.auth?.user?._id}`, {
        params: { ...params },
      })
      .then((res) => {
        let events = [];
        res.data.map((item) => {
          events.push({ value: item._id, label: item.title });
        });
        this.setState({ eventsData: events });
      })
      .catch((err) => console.log(err));
  };

  fetchUsers = (params = {}) => {
    axios
      .get(`${API}/getAllUser/${this.props?.auth?.user?._id}`, {
        params: { ...params },
      })
      .then((res) => {
        let users = [];
        res.data.map((item) => {
          users.push({ value: item._id, label: item.name });
        });
        this.setState({ usersData: users });
      })
      .catch((err) => console.log(err));
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.inviteeId.value);

    const formData = {
      eventId: this.state.eventId.value,
      inviteeId: this.state.inviteeId.value,
      senderId: this.props.auth?.user?._id,
      message: this.state.message,
      status: true,
    };

    axios
      .post(`${API}/user/invite`, formData)
      .then((res) => {
        toast("User Invited", { type: "success" });
        // this.props.closeModal("true");
        this.props.closeModal();
      })
      .catch((err) => {
        // console.log(err);
        toast(err.response.data, { type: "warning" });
        // this.props.closeModal("false");
        this.props.closeModal();
      });
  };

  render() {
    return (
      <div className="p-md-3">
        <div className="d-flex justify-content-end pt-md-2">
          <img
            src={CancelIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={this.props.closeModal}
          />
        </div>
        <h3 className="th-auth-heading mb-3">Invite a friend</h3>
        <form onSubmit={this.handleSubmit}>
          <div class="row justify-content-center">
            <div class="col-12  pb-4">
              <div className="th-auth-form-group">
                <Select
                  value={this.state.eventId}
                  onChange={(data) => this.setState({ eventId: data })}
                  options={this.state.eventsData}
                  placeholder="Select Event"
                  styles={customStyles}
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12  pb-4">
              <div className="th-auth-form-group">
                <Select
                  value={this.state.inviteeId}
                  onChange={(data) => this.setState({ inviteeId: data })}
                  options={this.state.usersData}
                  placeholder="Select Friend"
                  styles={customStyles}
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12 pb-4">
              <div className="th-auth-form-group">
                <input
                  type="text"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="message"
                  value={this.state.message}
                  onChange={this.handleChange}
                  placeholder="Write a Message"
                  required
                />
              </div>
            </div>
          </div>
          <div className="row justify-content-center pb-md-3 pb-2">
            <div className="col-12 justify-content-center d-flex">
              <button class="th-event-btn btn w-50" type="submit">
                <span> Invite Friend </span>
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

export default connect(mapStateToProps)(InvitationForm);
