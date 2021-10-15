import React from 'react';
import { withRouter } from 'next/router';
import { Modal } from 'react-bootstrap';
import defaultImage from '../../public/images/default.jpg';

class UserList extends React.PureComponent {
  render() {
    const { onHide, show, heading, list, router } = this.props;
    return (
      <Modal
        show={show}
        onHide={() => onHide(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-bottom border-secondary align-items-center" closeButton>
          <h5 className='text-white font-weight-bold m-0'>{heading}</h5>
          <small className='text-white-50'>({list.length} Total)</small>
        </Modal.Header>
        <Modal.Body>
          {list.map(item => (
            <div className="d-flex pt-3">
              <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
              <div className="border-bottom border-secondary pb-2 w-100">
                <small
                  onClick={() => router.push('/profile/[id]', `/profile/${item.id}`)}
                  className="cursor-pointer font-weight-bold d-block"
                >
                  {item.name}  
                </small>
                <small
                  className="text-white-50 text-small"
                >
                  {item.profession}
                </small>
              </div>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    );
  }
}

export default withRouter(UserList);