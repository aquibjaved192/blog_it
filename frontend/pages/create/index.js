import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { create } from '../../redux/reducers/createBlogReducer';
import Tags from '../../json/tags.json';
import style from './create.module.scss';
import { getLocalStorage } from '../../sharedComponents/helpers';
import MultiTagsField from '../../sharedComponents/multiTagsField';

class CreateBlogPage extends React.Component {
 constructor(props) {
  super(props);
  this.state = {
   title: '',
   content: '',
   selectedTags:[],
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

 handleTags = (values) => {
  this.setState({
    selectedTags: values
  })
 }

 onSubmit = () => {
  const { title, content, selectedTags } = this.state;
  const { create } = this.props;
  const user = getLocalStorage('user');
  const date = new Date();
  const tags = selectedTags.map(item => item.value);
  if (title && content) {
   const data = {
    id: user.id,
    name: user.name,
    profession: user.profession,
    title,
    tags,
    content,
    date,
    hits: 0,
   };
   create(data);
  }
 };

 render() {
  const { title, selectedTags } = this.state;
  return (
    <div className={style.container}>
      <div className={style.editors}>
        <div className={`banner border-secondary rounded-lg d-flex align-items-center ${style.createBanner}`}>
          <h1 className="text-white font-weight-bold ml-3 ml-lg-5">"Write what should not be forgotten"</h1>
          <div className="coverPhotoShade" />
        </div>
        <div className={`pb-3 pl-3 position-absolute pr-3 text-white w-100 border-secondary mb-5 rounded ${style.formBody}`}>
          <div className="mb-3">
            <label className="font-weight-bold">Blog Title</label>
            <textarea
              placeholder="Enter title here..."
              className={`${style.title} border border-secondary`}
              rows="1"
              onChange={(e) => this.handleChange(e, 'title')}
              maxLength="70"
            />
            <small className="float-right color-primary">Title length: {title.length}/70</small>
          </div>
          <div className="mb-4">
            <label className="font-weight-bold">Add tags</label>
            <MultiTagsField 
              optionsList={Tags}
              placeholder='Select tags'
              className=''
              onChange={this.handleTags}
              name="tags"
              value={selectedTags}
            />
          </div>
          <div>
            <label className="font-weight-bold">Blog Content</label>
            <textarea
              placeholder="Write your content here..."
              className={`${style.content} border border-secondary`}
              onChange={(e) => this.handleChange(e, 'content')}
            />
          </div>
          <div className="text-right mt-3">
            <button
              className="bg-transparent font-weight-bold rounded"
              onClick={this.onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
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
