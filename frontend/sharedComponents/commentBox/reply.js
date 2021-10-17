import React from 'react';
import { withRouter } from 'next/router';
import { getLocalStorage } from '../helpers';
import defaultImage from '../../public/images/default.jpg';
import UserList from '../Modal/userList';
import Confirm from '../Modal/confirm';

class Reply extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      likesCount: 0,
      totalLikes: [],
      showLikesModal: false,
      showDeleteConfirmModal: false,
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

  handleDelete = () => {
    const { showDeleteConfirmModal } = this.state;
    this.setState({
      showDeleteConfirmModal: !showDeleteConfirmModal
    })
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
    const { likeComments, data, router } = this.props;
    const user = getLocalStorage('user');
    if(user) {
      const likes = await likeComments(data._id, data.user);
      this.setState({
        liked: !liked,
        likesCount: likes.length || 0,
        totalLikes: likes,
      });
    } else {
      router.push('/login');
    }
  }

  confirmDelete = async () => {
    const { deleteComments, getReplies, data, setReplies } = this.props;
    await deleteComments(data._id, 'reply', data.parentId);
    const replies = await getReplies(data.parentId);
    setReplies(replies);
  }

  render() {
    const { data, router } = this.props;
    const { liked, likesCount, showLikesModal, totalLikes, showDeleteConfirmModal } = this.state;
    const user = getLocalStorage('user');
    return(
      <>
        {showLikesModal && (
          <UserList 
            show={showLikesModal}
            onHide={this.handleLikesModal}
            heading="Replies"
            list={totalLikes}
          />
        )}
        {showDeleteConfirmModal && (
          <Confirm 
            show={showDeleteConfirmModal}
            onHide={this.handleDelete}
            heading="Warning"
            body="Are you sure you want to delete this comment?"
            confirmDelete={this.confirmDelete}
          />
        )}
        <div className="d-flex pt-3">
          <img className="rounded-circle mr-3" height="35px" width="35px" src={defaultImage} alt="default-image" />
          <div className="border-bottom border-secondary pb-2 w-100">
            <div>
              <small
                onClick={() => router.push('/profile/[id]', `/profile/${data.user.id}`)}
                className="cursor-pointer font-weight-bold d-inline text-white"
              >
                {data.user.name}  
              </small>
              {data.user.id === user?.id && (
                <div
                  className="d-inline float-right"
                  onClick={this.handleDelete}
                >
                  <svg
                    width="15px"
                    height="15px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    preserveAspectRatio="xMidYMid"
                    style={{ fill: '#60CCCF', padding: '0' }}
                  >
                    <path d='M6.97217 19C6.97217 20.1 7.87217 21 8.97217 21H16.9722C18.0722 21 18.9722 20.1 18.9722 19V7H6.97217V19ZM8.97217 9H16.9722V19H8.97217V9ZM16.4722 4L15.4722 3H10.4722L9.47217 4H5.97217V6H19.9722V4H16.4722Z'/>
                  </svg>
                </div>
              )}
            </div>
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
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default withRouter(Reply);