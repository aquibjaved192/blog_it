import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getBlog } from '../../redux/reducers/getBlogReducer';
import Header from '../../sharedComponents/Header/header';
import defaultImage from '../../public/images/default.jpg';
import style from './blog.module.scss';

class Blog extends React.Component {
 componentDidMount() {
  const { getBlog, router } = this.props;
  getBlog(router.query.id);
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
    <Header />
    {data && data.title && (
     <div className={`${style.blog} m-auto`}>
      <div className="d-flex">
       <img height="70px" width="70px" src={defaultImage} alt="default-image" />
       <div className="ml-2">
        <div className="border-bottom w-100 pb-2">
          <h3 className="m-0">{data.title}</h3>
          <small className="m-0 text-black-50 d-block">
          {data.authorName}, {data.authorProfession}
          </small>
          <small className="text-black-50 m-0 d-block">
          Published on : {month}&nbsp;{day},&nbsp;{year}
          </small>
        </div>
        <div className="pt-2">
        <p>{data.content}</p>
        </div>
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
