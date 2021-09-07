import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import TrendingBlog from './trendingBlog';

class Trends extends React.PureComponent {
  render() {
    const { heading, trends } = this.props;
    return (
      <div className="ml-0">
        <div className="pb-3 text-white">
          <p className="m-0 font-weight-bold">
            {heading}
          </p>
        </div>     
        <div className="pt-3 pb-3 text-white border-top border-secondary">
          {trends.map(item => <TrendingBlog key={item._id} blog={item} />)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return{}
};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(Trends)
);
