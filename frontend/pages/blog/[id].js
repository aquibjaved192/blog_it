import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getBlog, deleteBlog, likeUnlikeBlog } from '../../redux/reducers/getBlogReducer';
import { getLocalStorage } from '../../sharedComponents/helpers';
import defaultImage from '../../public/images/default.jpg';
import style from './blog.module.scss';
import EditDeleteButtons from '../../sharedComponents/editDeleteButtons';
import Modal from '../../sharedComponents/Modal';

class Blog extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      showDeleteConfirmModal: false,
      liked: false,
      likesCount: 0,
    }
  }

  componentDidMount() {
    const { getBlog, router } = this.props;
    getBlog(router.query.id);
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const user = getLocalStorage('user');
    if(JSON.stringify(prevProps.data) !== JSON.stringify(data)) {
      if(user && data && data.likes) {
        this.setState({
          liked: data.likes.includes(user.id),
          likesCount: data.likes.length,
        });
      }
    }
  }

  goToPage = (pageName, pageUrl) => {
    const { router } = this.props;
    router.push(pageName,pageUrl);
  }

  handleDelete = () => {
    const { showDeleteConfirmModal } = this.state;
    this.setState({
      showDeleteConfirmModal: !showDeleteConfirmModal
    })
  }

  confirmDelete = () => {
    const { deleteBlog, router } = this.props;
    deleteBlog(router.query.id);
  }

  handleLike = async () => {
    const { liked } = this.state;
    const { likeUnlikeBlog, router } = this.props;
    const user = getLocalStorage('user');
    const likesCount = await likeUnlikeBlog(router.query.id, user.id);
    this.setState({
      liked: !liked,
      likesCount,
    });
  }

  render() {
    const { data } = this.props;
    const { showDeleteConfirmModal, liked, likesCount } = this.state;
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
    const user = getLocalStorage('user');
    return (
      <div className={style.container}>
        {data && data.title && (
          <div className={`${style.blog} m-auto rounded-lg position-relative`}>
            {showDeleteConfirmModal && (
              <Modal 
                show={showDeleteConfirmModal}
                onHide={this.handleDelete}
                heading="Warning"
                body="Are you sure you want to delete this blog?"
                confirmDelete={this.confirmDelete}
              />
            )}
            <div className={`banner border-secondary d-flex align-items-center rounded ${style.blogBanner}`}>
              <div className="coverPhotoShade" />
            </div>
            <div className={`rounded w-100 d-flex flex-column flex-lg-row flex-md-row p-2 pt-3 p-md-4 p-lg-4 position-absolute ${style.content}`}>
              <img 
                onClick={() => this.goToPage('/profile/[id]', `/profile/${data.authorId}`)} 
                height="100px" 
                width="100px" 
                className="cursor-pointer rounded-circle m-auto m-md-0 m-lg-0" 
                src={defaultImage} 
                alt="default-image" 
              />
              <div className="w-100 ml-md-4 ml-lg-4 mt-3 mt-md-0 mt-lg-0">
                <div className="border-bottom border-secondary w-100 pb-2">
                  <div className="row m-0 flex-column flex-md-row flex-lg-row align-items-lg-end align-items-md-end justify-content-between">
                    <h3 className="font-weight-bold text-white col-12 col-md-10 col-lg-10 p-0">{data.title}</h3>
                    {user?.id === data.authorId && (
                      <EditDeleteButtons 
                        handleDelete={this.handleDelete}
                        handleEdit={() => this.goToPage('/edit/[id]', `/edit/${data._id}`)}
                      />
                    )}
                  </div>
                  <div className="d-flex align-items-center flex-wrap">
                    {data.tags.map(item => <p key={item} className="pill mb-2">{item}</p>)} 
                  </div>
                  <small
                    onClick={() => this.goToPage('/profile/[id]', `/profile/${data.authorId}`)}
                    className="cursor-pointer d-block font-weight-bold color-primary"
                  >
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
                  className="pt-2 text-white-50 mb-3" 
                  dangerouslySetInnerHTML={{
                    __html: data.content,
                  }} 
                />
                <small className="color-primary font-weight-bold pt-3">{likesCount} Likes</small>
                {user && (
                  <div className='mb-3 border border-secondary rounded'>
                    <button
                      className={`${liked ? 'primary-bg color-secondary' : 'bg-transparent text-white'} border-0 font-weight-bold pb-2 pt-2 rounded w-100`}
                      onClick={this.handleLike}
                    >
                      <svg 
                        width="15" 
                        height="15" 
                        viewBox="0 0 13 12" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M12.9785 3.57828C12.7888 1.50469 11.3104 0.000248228 9.46029 0.000248228C8.22771 0.000248228 7.09914 0.658765 6.4641 1.71418C5.83481 0.645113 4.75249 0 3.53966 0C1.6898 0 0.211204 1.50444 0.0216922 3.57803C0.00669125 3.66962 -0.0548127 4.15166 0.132199 4.93776C0.401716 6.07161 1.02426 7.10295 1.93206 7.91958L6.4611 12L11.0679 7.91983C11.9757 7.10295 12.5982 6.07186 12.8678 4.93776C13.0548 4.15191 12.9933 3.66987 12.9785 3.57828Z" 
                          fill={`${liked ? "#303e46" : "#ffffff"}`}>
                        </path>
                      </svg>
                        {' '}{liked ? "You liked it" : "Give it a like"}
                    </button>
                  </div>
                )}
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
    deleteBlog: (id) => dispatch(deleteBlog(id)),
    likeUnlikeBlog: (blogId, userId) => dispatch(likeUnlikeBlog(blogId, userId)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
