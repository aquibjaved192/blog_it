import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/reducers/userProfileReducer';
import Header from '../../sharedComponents/Header/header';
import BlogCard from '../../sharedComponents/BlogCard/blogCard';
import CreateBlogButton from '../../sharedComponents/createBlogButton/createBlogButton';
import { getLocalStorage } from '../../sharedComponents/helpers';
import defaultImage from '../../public/images/default.jpg';
import defaultCover from '../../public/images/default-cover.gif';
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
    <Header />
    <div className={style.coverPhotoContainer}>
     <img src={defaultCover} className={style.coverPhoto} alt="cover" />
     <img src={defaultImage} className={style.profileImage} alt="profile-pic" />
    </div>
    <div className="p-3">
     <h5>{data.name}</h5>
     <p className="m-0">
      <strong>Profession: </strong>
      {data.profession}
     </p>
     <p>
      <strong>Email: </strong>
      {data.email}
     </p>
    </div>
    {data.blogs && data.blogs.length > 0 ? (
      <div className="p-2 align-items-center d-flex flex-wrap justify-content-start">
      {blogCards}
      </div>
    ) : (
      <h2 className="text-center">You have not posted any blogs yet</h2>
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
