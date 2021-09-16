import React from 'react';
import { withRouter } from 'next/router';
import defaultImage from '../../public/images/default.jpg';

class TrendingBlog extends React.PureComponent {
  handleClick = (page, url) => {
    const { router } = this.props;
    router.push(page, url);
  }

  render() {
    const { blog, router, searchBox } = this.props;
    const monthArray = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
      ];
  
      const date = new Date(blog.postDate);
      const day = date.getDate();
      const month = monthArray[date.getMonth()];
      const year = date.getFullYear();
    return (
      <div className="d-flex pt-3">
        <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
        <div className="border-bottom border-secondary pb-3 w-100">
          <small
            onClick={() => this.handleClick('/blog/[id]', `/blog/${blog._id}`)}
            className="mb-1 cursor-pointer font-weight-bold d-block"
          >
            {blog.title}
          </small>
          <small
            onClick={() => this.handleClick('/profile/[id]', `/profile/${blog.authorId}`)}
            className="cursor-pointer text-white-50 text-small float-left"
            >
              {(router.pathname === '/profile/[id]' && !searchBox) ? `${month} ${day}, ${year}` : blog.authorName}
          </small>
          <small
            className="text-white-50 text-small float-right"
          >
              {blog.hits} views
          </small>
        </div>
      </div>
    );
  }
}

export default withRouter(TrendingBlog);
