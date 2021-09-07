import React from 'react';
import { Modal, Button } from 'react-bootstrap';

class ConfirmTaskModal extends React.PureComponent {
  render() {
    const { onHide, show, heading, body, confirmDelete } = this.props;
    return (
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-bottom border-secondary" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {heading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p  className="m-0">{body}</p>
        </Modal.Body>
        <Modal.Footer className="border-top border-secondary">
          <Button className="border-0 font-weight-bold" onClick={confirmDelete}>delete</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ConfirmTaskModal;