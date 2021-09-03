import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getBlog } from '../../redux/reducers/getBlogReducer';
import defaultImage from '../../public/images/default.jpg';
import style from './blog.module.scss';

class Blog extends React.Component {
 componentDidMount() {
  const { getBlog, router } = this.props;
  getBlog(router.query.id);
 }

 goToProfile = () => {
   const { data, router } = this.props;
   router.push('/profile/[id]', `/profile/${data.authorId}`);
 }

 render() {
  const { data } = this.props;
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

  const date = new Date(data.postDate);
  const day = date.getDate();
  const month = monthArray[date.getMonth()];
  const year = date.getFullYear();
  return (
   <div className={style.container}>
    {data && data.title && (
      <div className={`${style.blog} m-auto rounded-lg position-relative`}>
        <div className={`banner border-secondary d-flex align-items-center ${style.blogBanner}`}>
          <div className="coverPhotoShade" />
        </div>
        <div className={`mb-5 w-100 d-flex flex-column flex-lg-row flex-md-row p-2 pt-3 p-md-4 p-lg-4 position-absolute ${style.content}`}>
          <img onClick={this.goToProfile} height="100px" width="100px" className="cursor-pointer rounded-circle m-auto m-md-0 m-lg-0" src={defaultImage} alt="default-image" />
          <div className="w-100 ml-md-4 ml-lg-4 mt-3 mt-md-0 mt-lg-0">
            <div className="border-bottom border-secondary w-100 pb-2">
              <h3 className="font-weight-bold text-white">{data.title}</h3>
              <div className="d-flex align-items-center flex-wrap">
                {data.tags.map(item => <p key={item} className="pill mb-2">{item}</p>)} 
              </div>
              <small onClick={this.goToProfile} className="cursor-pointer d-block font-weight-bold color-primary">
                {data.authorName}
              </small>
              <small className="text-white-50 d-block">
                {data.authorProfession}
              </small>
              <small className="text-white-50">
                {month}&nbsp;{day},&nbsp;{year}
              </small>
              <small className="text-white-50 font-weight-bold float-right">{data.hits} views</small>
            </div>
            <div 
              className="pt-2 text-white-50" 
              dangerouslySetInnerHTML={{
                __html: data.content,
              }} 
            />
          </div>
        </div>
      </div>
    )}
  </div>
  );
 }
}

const mapStateToProps = (state) => ({
 data: state.getBlog.data,
});

const mapDispatchToProps = (dispatch) => {
 return {
  getBlog: (id) => dispatch(getBlog(id)),
 };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
