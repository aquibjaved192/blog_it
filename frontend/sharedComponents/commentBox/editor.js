import React from 'react';
import { withRouter } from 'next/router';
import defaultImage from '../../public/images/default.jpg';
import style from './commentBox.module.scss';

class CommentEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      able: false, // to check last comment posted then allow next comment only
      comment: '',
    };
  }

  async componentDidMount() {
    const { getComments, itemId, setReplies, type } = this.props;
    if(type === 'comment') {
      getComments(itemId);
    } else if(type === 'reply') {
      const new_replies = await getComments(itemId);
      setReplies(new_replies);
    }
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
    const { user, commentBlog, itemId, type, setReplies, getComments } = this.props;
    const data = {
      parentId: itemId,
      user,
      comment,
      type,
    }
    this.toggleAble();
    await commentBlog(data);

    if(type === 'reply') {
      const replies = await getComments(itemId);
      setReplies(replies);
    }

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
    const { user, placeholder, btnText, router } = this.props;
    return (
      <>
        <div className="d-flex pt-3">
          <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
          <div className="w-100">
            <small
              onClick={() => user ? router.push('/profile/[id]', `/profile/${user.id}`) : () => {}}
              className="cursor-pointer font-weight-bold d-block text-white"
            >
              {user ? user.name : 'Blog!T User'}  
            </small>
            <textarea
              id="comment"
              placeholder={placeholder}
              className={`${style.title} border border-secondary text-white-50 mt-1`}
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
              disabled={!user}
            />
          </div>
        </div>
        <div className="text-right mt-2">
          <button
            className="rounded color-primary pl-3 pr-3 primary-border bg-transparent"
            onClick={this.postData}
            disabled={!user}
          >
            {btnText}
          </button>
        </div>
      </>
    );
  }
}

export default withRouter(CommentEditor);

