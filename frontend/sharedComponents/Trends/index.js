import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import HashTags from './hashtags';
import TrendingBlog from './trendingBlog';
import defaultImage from '../../public/images/default.jpg';

class Trends extends React.Component {
 render() {
  return (
   <div className="ml-3">
    <div className="pb-3 text-white">
      <p className="m-0 font-weight-bold">Trending</p>
    </div>
    <HashTags />
    <TrendingBlog />
   </div>
  );
 }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(Trends)
);
