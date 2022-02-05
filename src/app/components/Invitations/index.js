import React, { Component } from "react";
import { API } from "../../../api";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import AddEventModal from "./form";
import TabsCard from "./tab";

class Invitations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsList: [],
      showModal: false,
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = (params = {}) => {
    axios
      .get(`${API}/event/getAll/${this.props?.auth?.user?._id}`, {
        params: { ...params },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ eventsList: res.data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <React.Fragment>
        <div className="container th-margin-top">
          <div className="row d-md-flex align-items-md-center pt-md-5 pt-4 pb-md-3 pb-2">
            <h1 className="col-md-10 col-12 mb-md-0 mb-1 th-events-heading">
              This is my Invites page
            </h1>
            <div className="col-md-2 col-12 th-event-btn-wrap">
              <p
                className="m-0 th-event-btn"
                onClick={() => this.setState({ showModal: true })}
              >
                Invite a friend
              </p>
            </div>
          </div>
          <TabsCard user={this.props?.auth?.user} />
        </div>
        <Modal
          show={this.state.showModal}
          onHide={() => this.setState({ showModal: false })}
          size="lg"
          centered
          contentClassName="th-auth-signin-modal-content"
          dialogClassName="th-auth-signin-modal-dialog"
        >
          <Modal.Body>
            <AddEventModal
              closeModal={(val) => {
                this.setState({ showModal: false });
                if (val === "true") this.fetchEvents();
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

export default connect(mapStateToProps)(Invitations);
