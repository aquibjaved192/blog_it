import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import HashTags from './hashtags';
import TrendingBlog from './trendingBlog';
import Flame from '../../public/images/trending.png';

class Trends extends React.Component {
  render() {
    const { heading, show } = this.props;
    return (
      <div className="ml-3">
        <div className="pb-3 text-white">
          <p className="m-0 font-weight-bold">
            {heading}
          </p>
        </div>
        {show.includes("hashtags") && <HashTags />}
        {show.includes("blogs") && <TrendingBlog />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(Trends)
);
