import React, { Component } from "react";
import { API } from "../../../api";
import axios from "axios";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";
import AddEventModal from "./form";
import EventImage from "../../assets/images/event.jpg";

class Events extends Component {
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
              This is my events page
            </h1>
            <div className="col-md-2 col-12 th-event-btn-wrap">
              <p
                className="m-0 th-event-btn"
                onClick={() => this.setState({ showModal: true })}
              >
                Create an Event
              </p>
            </div>
          </div>
          <div className="row">
            {this.state.eventsList ? (
              this.state.eventsList.map((item, id) => {
                let owner = this.props?.auth?.user?.name;
                return (
                  <div className="col-md-4 col-12 pb-4" key={id}>
                    <div className="card">
                      <div className="card-header">{item.title}</div>
                      <div className="card-body">
                        <div className="card-title">
                          <img src={EventImage} alt="" className="w-100" />
                        </div>
                        <div className="card-text pt-1 pb-1">
                          {item.description}
                        </div>
                        <div className="card-text pb-1">
                          Venue: {item.venue}
                        </div>
                        <div className="card-text pb-1">Date: {item.date} </div>
                        <div className="card-text text-capitalize">
                          Host: {owner}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h4>There's no event</h4>
            )}
          </div>
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

export default connect(mapStateToProps)(Events);
