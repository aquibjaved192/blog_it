import React from 'react';
import defaultImage from '../../public/images/default.jpg';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateBlog } from '../../redux/reducers/getBlogReducer';
import style from './cards.module.scss';

class BlogCard extends React.PureComponent {
  onClickCard = (page, url) => {
    const { router } = this.props;
    router.push(page, url);
  };

  render() {
    const { blog } = this.props;
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
    <div className='col-lg-6 col-12 col-md-6 mb-2 p-0 pl-lg-1 pr-lg-1 pl-md-1 pr-md-1'>
      <div className={`${style.blogCard} pb-3 pl-3 pr-2 pt-3`}>
        <div className={`scrollBar ${style.blogCardContent}`}>
          <div 
            className={`d-flex align-items-center text-left pb-3 ${style.author}`} 
            onClick={() => this.onClickCard('/profile/[id]', `/profile/${blog.authorId}`)}
          >
            <img className="rounded-circle mr-3" height="70px" width="70px" src={defaultImage} alt="default-image" />
            <div className="w-100">
              <h6
                className="m-0 font-weight-bold"
              >
                {blog.authorName}
                <div className="float-right">
                  <span className="text-small text-white-50 pr-2 d-block mb-1">{blog.hits} views</span>
                  <span className="text-small text-white-50 pr-2 d-block">{blog.likes.length} likes</span>
                </div>
              </h6>
              <small className="text-white-50">{blog.authorProfession}</small>
              <p className={`${style.date} m-0 text-white-50`}>
                {month}&nbsp;{day},&nbsp;{year}
              </p>
            </div>
          </div>
          <div>
            <h6 className="font-weight-bold text-white">{blog.title}</h6>
            <div className="d-flex align-items-center flex-wrap">
              {blog.tags.slice(0,4).map(item => <p key={item} className="pill mb-2">{item}</p>)}
            </div>
            <small className="text-white-50">
              <div 
                dangerouslySetInnerHTML={{
                  __html: blog.content,
                }} 
                className={style.content}
              />
              <span
                className={`${style.continue} font-weight-bold d-inline ml-1`}
                onClick={() => this.onClickCard('/blog/[id]', `/blog/${blog._id}`)}
                >
                read more
              </span>
            </small>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return {
   updateBlog: (data, id) => dispatch(updateBlog(data, id)),
  };
 };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(BlogCard)
);
