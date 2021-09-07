import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getUserProfile } from '../../redux/reducers/userProfileReducer';
import Body from '../../sharedComponents/body';
import defaultImage from '../../public/images/default.jpg';
import style from './profile.module.scss';

class Profile extends React.PureComponent {
  componentDidMount() {
    const { router, getUserProfile } = this.props;
    getUserProfile(router.query.id);
  }

  render() {
    const { data } = this.props;
    return (
      <div className={style.container}>
        <div className={`banner ${style.coverPhotoContainer}`}>
          <div className="coverPhotoShade" />
          <div className={`ml-0 flex-row ${style.profileImage}`}>
            <img src={defaultImage} className={`rounded-circle`} alt="profile-pic" />
            <div className="p-3">
              <h5 className="font-weight-bold text-white">{data.name}</h5>
              <p className="m-0 text-white-50 font-weight-bold">
                {data.profession}
              </p>
              <p className="m-0 text-white-50 font-weight-bold">
                {data.email}
              </p>
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
 };
};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(Profile)
);
