import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { create } from '../../redux/reducers/createBlogReducer';
import style from './create.module.scss';
import { getLocalStorage } from '../../sharedComponents/helpers';

class CreateBlogPage extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   title: '',
   content: '',
  };
 }

 componentDidMount() {
  const user = getLocalStorage('user');
  const { router } = this.props;
  if (!user) {
   router.push('/login');
  }
 }

 handleChange = (e, fieldName) => {
  this.setState({
   [fieldName]: e.target.value,
  });
 };

 onSubmit = () => {
  const { title, content } = this.state;
  const { create } = this.props;
  const user = getLocalStorage('user');
  const date = new Date();
  if (title && content) {
   const data = {
    id: user.id,
    name: user.name,
    profession: user.profession,
    title: title,
    content: content,
    date: date,
   };
   create(data);
  }
 };

 render() {
  const { title } = this.state;
  return (
   <div className={style.container}>
    <div className={style.editors}>
     <div className="mb-4">
      <textarea
       placeholder="Enter title here..."
       className={style.title}
       rows="2"
       onChange={(e) => this.handleChange(e, 'title')}
       maxLength="50"
      />
      <small className="float-right text-white-50">Title length: {title.length}/50</small>
     </div>
     <textarea
      placeholder="Write your content here..."
      className={style.content}
      onChange={(e) => this.handleChange(e, 'content')}
     />
     <button className="bg-transparent font-weight-bold rounded" onClick={this.onSubmit}>Submit</button>
    </div>
   </div>
  );
 }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
 return {
  create: (data) => dispatch(create(data)),
 };
};

export default withRouter(
 connect(mapStateToProps, mapDispatchToProps)(CreateBlogPage)
);
