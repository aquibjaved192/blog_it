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
   router.push(`/profile/${data.authorId}`)
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
     <div className={`${style.blog} m-auto rounded`}>
      <div className="d-flex flex-column flex-lg-row flex-md-row p-2 pt-3 p-md-4 p-lg-4">
       <img onClick={this.goToProfile} height="70px" width="70px" className="cursor-pointer rounded-circle m-auto m-md-0 m-lg-0" src={defaultImage} alt="default-image" />
       <div className="ml-2 ml-md-4 ml-lg-4 mt-3 mt-md-0 mt-lg-0">
        <div className="border-bottom border-secondary w-100 pb-2">
          <h3 className="font-weight-bold text-white">{data.title}</h3>
          <small onClick={this.goToProfile} className="cursor-pointer m-0 d-block font-weight-bold color-primary">
            {data.authorName}
          </small>
          <small className="m-0 text-white-50 d-block">
            {data.authorProfession}
          </small>
          <small className="text-white-50 m-0 d-block">
            {month}&nbsp;{day},&nbsp;{year}
          </small>
        </div>
        <div className="pt-2 text-white-50">
          <p>{data.content}</p>
        </div>
       </div>
      </div>
      <div className="pt-2 pb-3 text-white-50 text-center">
        <p>*******************************</p>
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
