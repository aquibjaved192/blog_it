import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { getBlog, deleteBlog } from '../../redux/reducers/getBlogReducer';
import { getLocalStorage } from '../../sharedComponents/helpers';
import defaultImage from '../../public/images/default.jpg';
import style from './blog.module.scss';
import EditDeleteButtons from '../../sharedComponents/editDeleteButtons';
import Modal from '../../sharedComponents/Modal';

class Blog extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      showDeleteConfirmModal: false
    }
  }

  componentDidMount() {
    const { getBlog, router } = this.props;
    getBlog(router.query.id);
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

  render() {
    const { data } = this.props;
    const { showDeleteConfirmModal } = this.state;
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
            <div className={`rounded mb-5 w-100 d-flex flex-column flex-lg-row flex-md-row p-2 pt-3 p-md-4 p-lg-4 position-absolute ${style.content}`}>
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
                  className="pt-2 text-white-50" 
                  dangerouslySetInnerHTML={{
                    __html: data.content,
                  }} 
                />
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
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
