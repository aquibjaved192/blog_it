import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/reducers/userProfileReducer';
import BlogCard from '../../sharedComponents/BlogCard/blogCard';
import CreateBlogButton from '../../sharedComponents/createBlogButton/createBlogButton';
import { getLocalStorage } from '../../sharedComponents/helpers';
import defaultImage from '../../public/images/default.jpg';
import style from './profile.module.scss';

class Profile extends React.Component {
 componentDidMount() {
  const { router, getUserProfile } = this.props;
  getUserProfile(router.query.id);
 }

 render() {
  const { data, router } = this.props;
  const user = getLocalStorage('user');

  const blogCards =
   data.blogs &&
   data.blogs.map((blog) => {
    const blogObj = {
     postDate: blog.postDate,
     authorName: data.name,
     authorProfession: data.profession,
     title: blog.title,
     content: blog.content,
     _id: blog._id,
     authorId: data.authorId,
    };

    return <BlogCard key={blog._id} blog={blogObj} />;
   });

  return (
   <div className={style.container}>
    <div
      className={style.coverPhotoContainer}
      style={{ backgroundImage: `url(https://picsum.photos/id/8/700/200)` }}
    >
    <div className={style.coverPhotoShade} />
     <div className={style.profileImage}>
      <img src={defaultImage} className={`rounded-circle`} alt="profile-pic" />
      <div className="p-3">
        <h5 className="font-weight-bold text-white">{data.name}</h5>
        <p className="m-0 text-white-50">
          {data.profession}
        </p>
        <p className="m-0 text-white-50">
          {data.email}
        </p>
      </div>
     </div>
    </div>
    {data.blogs && data.blogs.length > 0 ? (
      <div className="p-2 align-items-center d-flex flex-wrap justify-content-start">
      {blogCards}
      </div>
    ) : (
      <h2 className="text-center text-white">You have not posted any blogs yet</h2>
    )}
    {user && user.id === router.query.id && <CreateBlogButton />}
   </div>
  );
 }
}

const mapStateToProps = (state) => ({
 data: state.userProfile.data,
});

const mapDispatchToProps = (dispatch) => {
 return {
  getUserProfile: (id) => dispatch(getUserProfile(id)),
 };
};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(Profile)
);
