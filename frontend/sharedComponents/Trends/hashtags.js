import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';

class HashTags extends React.Component {
 render() {
  return (
    <div className="pt-3 text-white border-top border-secondary">
      <small className="m-0 font-weight-bold d-block">Hashtags</small>
      <div className="d-flex align-items-center flex-wrap pt-2 pb-2">
        <p className="pill mb-2">#technology</p>
        <p className="pill mb-2">#life</p>
        <p className="pill mb-2">#philosophy</p>
        <p className="pill mb-2">#literature</p>
        <p className="pill mb-2">#nature</p>
      </div>
    </div>
  );
 }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(HashTags)
);
