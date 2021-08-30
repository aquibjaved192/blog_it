import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import defaultImage from '../../public/images/default.jpg';

class TrendingBlog extends React.Component {
 render() {
  return (
    <div className="pt-3 pb-3 text-white border-top border-secondary">
      <small className="m-0 font-weight-bold d-block">Blogs</small>
      <div className="d-flex pt-3">
        <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
        <div className="border-bottom border-secondary pb-3">
          <small className="mb-1 font-weight-bold d-block">This is an awesome blog which is written by me</small>
          <small className="d-block text-white-50 text-small">Aquib Javed</small>
        </div>
      </div>
      <div className="d-flex pt-3">
        <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
        <div className="border-bottom border-secondary pb-3">
          <small className="mb-1 font-weight-bold d-block">This is an awesome blog which is written by me</small>
          <small className="d-block text-white-50 text-small">Aquib Javed</small>
        </div>
      </div>
      <div className="d-flex pt-3">
        <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
        <div className="border-bottom border-secondary pb-3">
          <small className="mb-1 font-weight-bold d-block">This is an awesome blog which is written by me</small>
          <small className="d-block text-white-50 text-small">Aquib Javed</small>
        </div>
      </div>
      <div className="d-flex pt-3">
        <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
        <div className="border-bottom border-secondary pb-3">
          <small className="mb-1 font-weight-bold d-block">This is an awesome blog which is written by me</small>
          <small className="d-block text-white-50 text-small">Aquib Javed</small>
        </div>
      </div>
    </div>
  );
 }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(TrendingBlog)
);
