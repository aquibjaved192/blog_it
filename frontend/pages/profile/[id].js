import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/reducers/userProfileReducer';
import Trends from '../../sharedComponents/Trends';
import BlogCard from '../../sharedComponents/blogCard';
import defaultImage from '../../public/images/default.jpg';
import style from './profile.module.scss';

class Profile extends React.Component {
 componentDidMount() {
  const { router, getUserProfile } = this.props;
  getUserProfile(router.query.id);
 }

 render() {
  const { data } = this.props;
  const blogCards =
    data.blogs &&
    data.blogs.map((blog) => {
      const blogObj = {
        postDate: blog.postDate,
        authorName: data.name,
        authorProfession: data.profession,
        title: blog.title,
        tags: blog.tags,
        content: blog.content,
        hits: blog.hits,
        _id: blog._id,
        authorId: data.authorId,
      };
    return <BlogCard key={blog._id} blog={blogObj} />;
  });

  return (
   <div className={style.container}>
    <div className={`banner ${style.coverPhotoContainer}`}>
      <div className="coverPhotoShade" />
      <div className={`ml-0 ml-lg-5 flex-row ${style.profileImage}`}>
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
      <div className="row ml-0 mr-0 mb-4 banner-body-margin justify-content-around">
        <div className="col-12 col-lg-3 mb-5">
          <Trends
            heading="Top Entries"
            trends={data.mostRead}
          />
        </div>
        <div className="row m-0 col-lg-8 col-12">
          {blogCards}
        </div>
      </div>
    ) : (
      <h2 className="text-center text-white">You have not posted any blogs yet</h2>
    )}
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
