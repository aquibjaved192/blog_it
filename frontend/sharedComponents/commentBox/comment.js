import React from 'react';
import { withRouter } from 'next/router';
import { getLocalStorage } from '../helpers';
import defaultImage from '../../public/images/default.jpg';
import UserList from '../Modal/userList';
import Editor from './editor';

class Comment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likesCount: 0,
      totalLikes: [],
      showLikesModal: false,
      showReplies: false,
      replies: [],
    }
  }

  componentDidMount() {
    this.setInitialLikes();
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    if(JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
      this.setInitialLikes();
    }
  }

  handleLikesModal = (showLikesModal) => {
    this.setState({
      showLikesModal,
    })
  }

  handleReplies = () => {
    const { showReplies } = this.state;
    this.setState({
      showReplies: !showReplies
    })
  }

  setReplies = (replies) => {
    this.setState({
      replies
    });
  }

  setInitialLikes = () => {
    const { data } = this.props;
    const user = getLocalStorage('user');
    if(data && data.likes) {
      this.setState({
        liked: user ? data.likes.find(item => item.id === user.id) : false,
        likesCount: data.likes.length,
        totalLikes: data.likes,
      });
    }
  }

  handleCommentLike = async () => {
    const { liked } = this.state;
    const { likeComments, data } = this.props;
    const likes = await likeComments(data._id, data.user);
    this.setState({
      liked: !liked,
      likesCount: likes.length || 0,
      totalLikes: likes,
    });
  }

  render() {
    const { data, router, hideReply, getReplies, likeComments, commentBlog} = this.props;
    const { liked, likesCount, showLikesModal, totalLikes, showReplies, replies } = this.state;
    const user = getLocalStorage('user');
    return(
      <>
        {showLikesModal && (
          <UserList 
            show={showLikesModal}
            onHide={this.handleLikesModal}
            heading={btnText}
            list={totalLikes}
          />
        )}
        <div className="d-flex pt-3">
          <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
          <div className="border-bottom border-secondary pb-2 w-100">
            <small
              onClick={() => router.push('/profile/[id]', `/profile/${data.user.id}`)}
              className="cursor-pointer font-weight-bold d-block text-white"
            >
              {data.user.name}  
            </small>
            <p className='text-white-50 mb-0 text-medium'>{data.comment}</p>
            <button
              className={`text-white border-0 p-0 bg-transparent text-small`}
              onClick={() => this.handleLikesModal(true)}
            >
              {likesCount} Likes
            </button>
            <div>
              <button
                className={`${liked ? 'color-primary' : 'text-white-50'} border-0 p-0 bg-transparent text-small font-weight-bold mr-2`}
                onClick={this.handleCommentLike}
              >
                Like
              </button>
              {!hideReply && (
                <button
                  className={`${showReplies ? 'color-primary' : 'text-white-50'} border-0 p-0 bg-transparent font-weight-bold text-small`}
                  onClick={this.handleReplies}
                >
                  {showReplies ? "Hide" : "Reply"}
                </button>
              )}
            </div>
            {showReplies && (
              <>
                {replies.map(item => (
                  <Comment                        // show replies
                    data={item}
                    key={item._id}
                    likeComments={likeComments}
                    hideReply={true}
                  />
                ))}
                <Editor                         // show replies editor
                  commentBlog={commentBlog}
                  user={user}
                  getComments={getReplies}
                  placeholder="Type reply here..."
                  btnText="Reply"
                  itemId={data._id}
                  type="reply"
                  setReplies={this.setReplies}
                />
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Comment);