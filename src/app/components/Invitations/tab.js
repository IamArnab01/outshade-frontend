import React, { Component } from "react";
import EventImage from "../../assets/images/event.jpg";
import axios from "axios";
import { connect } from "react-redux";
import { API } from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class InvitationsTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTab: true,
      GuestList: [{}, {}],
      Invitations: [],
    };
  }

  componentDidMount() {
    this.fetchGuestList({ sender: this.props.auth?.user?._id, status: true });
    this.fetchMyInvitations({
      invitee: this.props.auth?.user?._id,
      status: true,
    });
  }

  fetchGuestList = (params = {}) => {
    axios
      .get(`${API}/user/invitation/list`, {
        params: { ...params },
      })
      .then((res) => {
        this.setState({ GuestList: res.data.data });
      })
      .catch((err) => console.log(err));
  };

  fetchMyInvitations = (params = {}) => {
    axios
      .get(`${API}/user/invitation/list`, {
        params: { ...params },
      })
      .then((res) => {
        this.setState({ Invitations: res.data.data });
      })
      .catch((err) => console.log(err));
  };

  handleInvitationRequest = (msg, invite_id) => {
    let message =
      msg === "accept" ? "Invitaiton Accepted" : "Invitation Declined";
    const data = {
      message: message,
      status: false,
    };

    axios
      .patch(`${API}/user/invitation/${invite_id}`, data)
      .then((res) => {
        toast(res.data.message, {
          type: msg === "accept" ? "success" : "error",
        });
        // fetch invitations after update
        this.fetchMyInvitations({
          invitee: this.props.auth?.user?._id,
          status: true,
        });
      })
      .catch((err) => {
        toast(err.response.data, { type: "warning" });
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div
            onClick={() => this.setState({ showTab: false })}
            className={
              !this.state.showTab
                ? "th-invites-tab-bar focus"
                : "th-invites-tab-bar"
            }
          >
            <span className="">Guest List</span>
          </div>
          <div
            onClick={() => this.setState({ showTab: true })}
            className={
              this.state.showTab
                ? "th-invites-tab-bar focus"
                : "th-invites-tab-bar"
            }
          >
            <span className="">My Invitations</span>
          </div>
        </div>
        {this.state.showTab ? (
          <div className="row">
            {this.state.Invitations &&
              this.state.Invitations.map((item, id) => {
                return (
                  <div className="col-md-4 col-12 pb-4" key={id}>
                    <div className="card">
                      <div className="card-header">
                        Invitation for {item?.event?.title}
                      </div>
                      <div className="card-body">
                        <div className="card-title">
                          <img src={EventImage} alt="" className="w-100" />
                        </div>
                        <h5 className="pt-1">
                          {" "}
                          <i>Event Detail</i>{" "}
                        </h5>
                        <div className="card-text pb-1">
                          {item?.event?.description}
                        </div>
                        <div className="card-text pb-1">
                          Venue: {item?.event?.venue}
                        </div>
                        <div className="card-text pb-1">
                          Date: {item?.event?.date}{" "}
                        </div>
                        {/*  */}
                        <div className="row pt-2 ">
                          <div className="col-6">
                            <div
                              className="w-100 btn btn-success"
                              onClick={() =>
                                this.handleInvitationRequest("accept", item._id)
                              }
                            >
                              Accept
                            </div>
                          </div>
                          <div className="col-6">
                            <div
                              className="w-100 btn btn-danger"
                              onClick={() =>
                                this.handleInvitationRequest(
                                  "decline",
                                  item._id
                                )
                              }
                            >
                              {" "}
                              Decline
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="row">
            {this.state.GuestList &&
              this.state.GuestList.map((item, id) => {
                let owner = this.props?.auth?.user?.name;
                return (
                  <div className="col-md-4 col-12 pb-4" key={id}>
                    <div className="card">
                      <div className="card-header">
                        Invitation for {item?.event?.title}
                      </div>
                      <div className="card-body">
                        <div className="card-title">
                          <img src={EventImage} alt="" className="w-100" />
                        </div>
                        <h5 className="pt-1">
                          {" "}
                          <i>Event Detail</i>{" "}
                        </h5>
                        <div className="card-text pb-1">
                          {item?.event?.description}
                        </div>
                        <div className="card-text pb-1">
                          Venue: {item?.event?.venue}
                        </div>
                        <div className="card-text pb-1">
                          Date: {item?.event?.date}{" "}
                        </div>
                        <div className="card-text text-capitalize">
                          Host: {owner}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(InvitationsTab);
