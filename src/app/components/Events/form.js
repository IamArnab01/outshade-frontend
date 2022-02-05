import React, { Component } from "react";
import CancelIcon from "../../assets/images/close-square.png";
import { connect } from "react-redux";
import { API } from "../../../api";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

class EventsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      date: "",
      venue: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      owner: this.props?.auth?.user?._id,
      title: this.state.title,
      description: this.state.description,
      date: this.state.date,
      venue: this.state.venue,
    };

    axios
      .post(`${API}/event/create`, formData)
      .then((res) => {
        // console.log(res.data);
        toast("Event Added", { type: "success" });
        this.props.closeModal("true");
      })
      .catch((err) => {
        // console.log(err);
        toast(err.response.data, { type: "warning" });
        this.props.closeModal("false");
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
        <h3 className="th-auth-heading mb-3">Add a new Event</h3>
        <form onSubmit={this.handleSubmit}>
          <div class="row justify-content-center">
            <div class="col-12 pb-4">
              <div className="th-auth-form-group">
                <input
                  type="text"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                  placeholder="Title"
                  required
                />
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <div class="col-12  pb-4">
              <div className="th-auth-form-group">
                <input
                  type="text"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                  placeholder="Date (DD-MM-YYYY)"
                  required
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12  pb-4">
              <div className="th-auth-form-group">
                <input
                  type="text"
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="venue"
                  value={this.state.venue}
                  onChange={this.handleChange}
                  placeholder="Event Venue"
                  required
                />
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-12  pb-4">
              <div className="th-auth-form-group">
                <textarea
                  rows={3}
                  className="th-auth-form-control form-control"
                  id="validationDefault01"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  placeholder="description"
                  required
                />
              </div>
            </div>
          </div>
          {/* buttons */}
          <div className="row justify-content-center pb-md-3 pb-2">
            <div className="col-12 justify-content-center d-flex">
              <button class="th-event-btn btn w-50" type="submit">
                <span> Add Event </span>
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

export default connect(mapStateToProps)(EventsForm);
