import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import InviteModal from "./form";
import TabsCard from "./tab";

class Invitations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      isRefetch: false,
    };
  }

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
          <TabsCard isRefetch={this.state.isRefetch} />
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
            <InviteModal
              closeModal={(val) => {
                this.setState({ showModal: false });
                if (val === "true") this.setState({ isRefetch: true });
              }}
            />
          </Modal.Body>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Invitations;
