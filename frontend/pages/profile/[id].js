import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getUserProfile, followUser } from '../../redux/reducers/userProfileReducer';
import { getLocalStorage } from '../../sharedComponents/helpers';
import Body from '../../sharedComponents/body';
import defaultImage from '../../public/images/default.jpg';
import style from './profile.module.scss';

class Profile extends React.PureComponent {
  componentDidMount() {
    const { router, getUserProfile } = this.props;
    getUserProfile(router.query.id);
  }

  componentDidUpdate(prevProps) {
    const { router, getUserProfile } = this.props;
    if (router.query.id !== prevProps.router.query.id) {
      getUserProfile(router.query.id);
    }
  }

  onClickFollow = () => {
    const { router,  followUser } = this.props;
    const user = getLocalStorage('user')
    const followerId = user.id;
    const followingId = router.query.id;
    if (user.following.includes(router.query.id)) {
      followUser('unfollow', followerId, followingId);
    } else {
      followUser('follow', followerId, followingId)
    }
  }

  render() {
    const { data, router } = this.props;
    const user = getLocalStorage('user');
    return (
      <div className={style.container}>
        <div className={`banner ${style.coverPhotoContainer}`}>
          <div className="coverPhotoShade" />
          <div className={style.profileImage}>
            <div className="ml-0 d-flex flex-row align-items-center col-lg-8 col-md-8 col-12 p-lg-0">
              <img src={defaultImage} className={`rounded-circle`} alt="profile-pic" />
              <div className="pl-3">
                <h5 className="font-weight-bold text-white">{data.name}</h5>
                <p className="m-0 text-white-50 font-weight-bold">
                  {data.profession}
                </p>
                <p className="m-0 text-white-50 font-weight-bold">
                  {data.email}
                </p>
              </div>
            </div>
            
              <div className="col-12 col-md-3 col-lg-3 row m-0 p-0">
                <div className="col-4 p-0"/>
                <div className="col-8 p-0 text-left text-lg-right text-md-right">
                {user && user?.id !== router.query.id && (
                  <button
                    className="font-weight-bold rounded color-secondary border-0 primary-bg mb-2 pt-1 pb-1 pl-3 pr-3"
                    onClick={this.onClickFollow}
                  >
                    {user.following.includes(router.query.id) ? "Following" : "Follow"}
                  </button>
                )}
                </div> 
              </div>
          </div>
        </div>
        {data.blogs && data.blogs.length > 0 ? (
          <Body
            heading="Top Blogs"
            data={data}
          />
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
  followUser: (process, followerId, followingId) => dispatch(followUser(process, followerId, followingId)),
 };
};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(Profile)
);
