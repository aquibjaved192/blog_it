import React from 'react';
import { withRouter } from 'next/router';
import defaultImage from '../../public/images/default.jpg';

class TrendingBlog extends React.Component {
  handleClick = (page, url, checkPage = true) => {
    const { router } = this.props;
    router.push(page, url);
  }

  render() {
    const { blog } = this.props;
    return (
      <div className="d-flex pt-3">
        <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
        <div className="border-bottom border-secondary pb-3 w-100">
          <small onClick={() => this.handleClick('/blog/[id]', `/blog/${blog._id}`)} className="mb-1 cursor-pointer font-weight-bold d-block">{blog.title}</small>
          <small onClick={() => this.handleClick('/profile/[id]', `/profile/${blog.authorId}`)} className="cursor-pointer text-white-50 text-small float-left">{blog.authorName}</small>
          <small className="text-white-50 text-small float-right">{blog.hits} views</small>
        </div>
      </div>
    );
  }
}

export default withRouter(TrendingBlog);
