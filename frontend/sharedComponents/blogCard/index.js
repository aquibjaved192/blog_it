import React from 'react';
import defaultImage from '../../public/images/default.jpg';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { updateBlog } from '../../redux/reducers/getBlogReducer';
import style from './blogCard.module.scss';

class BlogCard extends React.PureComponent {
 onClickCard = (url) => {
  const { router } = this.props;
  router.push(url);
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
   <div className='col-lg-6 col-12 col-md-6 mb-3 p-0'>
    <div className={`${style.blogCard} ml-2 mr-2 pl-3 pr-3`}>
      <div 
        className={`d-flex align-items-center text-left pt-3 pb-3 ${style.author}`} 
        onClick={() => this.onClickCard(`/profile/${blog.authorId}`)}
      >
        <img className="rounded-circle mr-3" height="70px" width="70px" src={defaultImage} alt="default-image" />
        <div>
          <h6
            className="m-0 font-weight-bold"
          >
            {blog.authorName}
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
          {blog.content}...
          <span
          className={`${style.continue} font-weight-bold`}
          onClick={() => this.onClickCard(`/blog/${blog._id}`)}
          >
          Continue Reading
          </span>
        </small>
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
