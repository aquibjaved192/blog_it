import React from 'react';
import { withRouter } from 'next/router';

class EditDeleteButtons extends React.PureComponent {
  render(){
    const { handleEdit, handleDelete } = this.props;
    return(
      <div className="row m-0 align-items-center col-12 col-md-2 col-lg-2 p-0 mb-2">
        <div
          className="col-2 col-md-6 col-lg-6 m-0 text-right p-0 ml-auto ml-md-0 ml-lg-0"
          onClick={handleEdit}
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            version="1.1"
            preserveAspectRatio="xMidYMid"
            style={{ fill: '#60CCCF', padding: '0' }}
          >
            <path d='M15.06 9.02L15.98 9.94L6.92 19H6V18.08L15.06 9.02V9.02ZM18.66 3C18.41 3 18.15 3.1 17.96 3.29L16.13 5.12L19.88 8.87L21.71 7.04C21.8027 6.94749 21.8763 6.8376 21.9264 6.71662C21.9766 6.59565 22.0024 6.46597 22.0024 6.335C22.0024 6.20403 21.9766 6.07435 21.9264 5.95338C21.8763 5.8324 21.8027 5.72251 21.71 5.63L19.37 3.29C19.17 3.09 18.92 3 18.66 3V3ZM15.06 6.19L4 17.25V21H7.75L18.81 9.94L15.06 6.19V6.19Z' />
          </svg>
        </div>
        <div
          className="col-2 col-md-6 col-lg-6 text-right m-0 p-0"
          onClick={handleDelete}
        >
          <svg
            width="22px"
            height="22px"
            viewBox="0 0 24 24"
            version="1.1"
            preserveAspectRatio="xMidYMid"
            style={{ fill: '#60CCCF', padding: '0' }}
          >
            <path d='M6.97217 19C6.97217 20.1 7.87217 21 8.97217 21H16.9722C18.0722 21 18.9722 20.1 18.9722 19V7H6.97217V19ZM8.97217 9H16.9722V19H8.97217V9ZM16.4722 4L15.4722 3H10.4722L9.47217 4H5.97217V6H19.9722V4H16.4722Z'/>
          </svg>
        </div>
      </div>
    )
  }
}

export default withRouter(EditDeleteButtons);