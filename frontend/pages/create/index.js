import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { create } from '../../redux/reducers/createBlogReducer';
import { updateBlog } from '../../redux/reducers/getBlogReducer';
import Tags from '../../json/tags.json';
import style from './create.module.scss';
import { getLocalStorage } from '../../sharedComponents/helpers';
import MultiTagsField from '../../sharedComponents/multiTagsField';
import dynamic from 'next/dynamic';
const Editor = dynamic(() => import('../../sharedComponents/editor'), {
  ssr: false,
});

class CreateBlogPage extends React.Component {
  constructor(props) {
    super(props);
    const { data } = props;
    this.state = {
      title: data ? data.title : '',
      content: data ? data.content : '',
      selectedTags:data ? data.tags?.map(item => ({ value: item, label: item })) : [],
    };
  }

  componentDidMount() {
    const user = getLocalStorage('user');
    const { router } = this.props;           
    if (!user) {
      router.push('/login');
    }
    const ele = document.getElementById("title");
    ele.style.height = ele.scrollHeight + 'px';
  }

  handleChangeTitle = (e) => {
    e.target.style.height = e.target.scrollHeight + 'px';
    this.setState({
      title: e.target.value,
    });
  };

  handleChangeContent = (data) => {
    this.setState({
      content: data,
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

  onEdit = () => {
    const { router, updateBlog } = this.props;
    const { title, content, selectedTags } = this.state;
    const tags = selectedTags.map(item => item.value);
    if (title && content) {
      const data = {
        title,
        tags,
        content
      }
      updateBlog(data, router.query.id);
    }
  }

  handleSubmitClick = () => {
    const { data } = this.props;
    if(data) {
      this.onEdit();
    } else {
      this.onSubmit();
    }
  }

  render() {
    const { title, selectedTags, content } = this.state;
    return (
      <div className={style.container}>
        <div className={style.editors}>
          <div className={`banner border-secondary rounded-lg d-flex align-items-center ${style.createBanner}`}>
            <h2 className="text-white font-weight-bold ml-3">"Write what should not be forgotten"</h2>
            <div className="coverPhotoShade" />
          </div>
          <div className={`pb-3 pl-3 position-absolute pr-3 text-white w-100 border-secondary mb-5 rounded ${style.formBody}`}>
            <div className="mb-3">
              <label className="font-weight-bold">Blog Title</label>
              <textarea
                id="title"
                placeholder="Enter title here..."
                className={`${style.title} border border-secondary`}
                rows="1"
                onChange={this.handleChangeTitle}
                maxLength="70"
                value={title}
              />
              <small className="float-right text-white font-weight-bold">{title.length}/70</small>
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
              <Editor 
                onChange={this.handleChangeContent}
                value={content}
              />
            </div>
            <div className="text-right mt-3">
              <button
                className="font-weight-bold rounded color-secondary border-0 primary-bg"
                onClick={this.handleSubmitClick}
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
    updateBlog: (data, id) => dispatch(updateBlog(data, id)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateBlogPage)
);
