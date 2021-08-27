import defaultImage from '../../public/images/default.jpg';
import { withRouter } from 'next/router';
import style from './blogCard.module.scss';

class BlogCard extends React.PureComponent {
 onClickProfile = (id) => {
  const { router } = this.props;
  router.push(`/profile/${id}`);
 };

 render() {
  const { blog, router } = this.props;
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
   <div className='col-lg-4 col-12 col-md-6 mb-3 p-0'>
    <div className={`${style.blogCard} ml-2 mr-2 pl-3 pr-3`}>
      <div className={`d-flex align-items-center text-left ${style.author}`}>
        <img height="100px" width="100px" src={defaultImage} alt="default-image" />
        <div>
          <h6
          className="m-0 font-weight-bold"
          onClick={() => this.onClickProfile(blog.authorId)}
          >
          {blog.authorName}
          </h6>
          <small>{blog.authorProfession}</small>
          <p className={`${style.date} m-0`}>
          {month}&nbsp;{day},&nbsp;{year}
          </p>
        </div>
      </div>
      <div>
      <h6 className="font-weight-bold">{blog.title}</h6>
      <small>
        {blog.content}...
        <span
        className={`${style.continue} font-weight-bold`}
        onClick={() => router.push(`/blog/${blog._id}`)}
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

export default withRouter(BlogCard);
