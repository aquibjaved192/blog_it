import React from 'react';
import { withRouter } from 'next/router';
import defaultImage from '../../public/images/default.jpg';
import style from './commentEditor.module.scss';

class CommentEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      able: false, // to check last comment posted then allow next comment only
      comment: '',
    };
  }

  componentDidMount() {
    const { getComments, router } = this.props;
    getComments(router.query.id);
  }

  handleChange = (e) => {
    this.setState({
        comment: e.target.value,
    });
    this.adjustHeight(e.target)
  };

  adjustHeight = (e) => {
    e.style.height = 'inherit';
    e.style.height = `${e.scrollHeight}px`;
  };

  toggleAble = () => {
    const { able } = this.state;
    this.setState({
      able: !able,
    });
  };

  postData = async () => {
    const { comment } = this.state;
    const { user, commentBlog, router } = this.props;
    const data = {
      blogId: router.query.id,
      user,
      comment,
    }
    this.toggleAble();
    await commentBlog(data);
    this.setState({
      comment: '',
    });
    const el = document.getElementById('comment');
    el.style.minHeight = '40px';
    el.blur();
    this.adjustHeight(el);
    this.toggleAble();
  };

  render() {
    const { comment, able } = this.state;
    return (
      <>
        <div className="d-flex pt-3">
          <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
          <div className="w-100">
            <textarea
              id="comment"
              placeholder="Enter comment here..."
              className={`${style.title} border border-secondary text-white-50`}
              rows="1"
              value={comment}
              disabled={able}
              onChange={this.handleChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  this.postData();
                }
              }}
            />
          </div>
        </div>
        <div className="text-right mt-2 mb-5">
          <button
            className="rounded color-primary pl-3 pr-3 primary-border bg-transparent"
            onClick={this.postData}
          >
            Post
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(CommentEditor);

