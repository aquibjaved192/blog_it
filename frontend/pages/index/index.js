import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import BlogCard from '../../sharedComponents/BlogCard/blogCard';
import { showSearchChange } from '../../redux/reducers/getSearchReducer';
import axios from 'axios';
import style from './home.module.scss';

class Home extends React.PureComponent {
  componentWillUnmount() {
    const { showSearchChange } = this.props;
    showSearchChange(false);
  }

  render() {
    let showBlogs = [];
    const { searchBlogs, showSearch, blogs } = this.props;
    showBlogs = showSearch ? searchBlogs : blogs;
    const blogCards =
    showBlogs.length > 0 &&
    showBlogs.map((blog) => {
      return <BlogCard key={blog._id} blog={blog} />;
    });

    return (
    <div className={style.container}>
      <div className={`pl-3 pr-3 d-none d-lg-flex banner ${style.homeBanner}`}>
        <h1 className="text-white font-weight-bold">Welcome</h1>
        <div className="coverPhotoShade" />
      </div>
      <div className="row ml-2 mr-2">
        {blogCards}
      </div>
    </div>
    );
  }
}

export async function getStaticProps() {
 const res = await axios.get('http://localhost:5000/getAllBlogs');
 const data = res.data.data;
 const blogs = [];
 data.forEach((blog) => {
  blogs.unshift(blog);
 });
 return {
  props: {
   blogs,
  },
 };
}

const mapStateToProps = (state) => ({
 searchBlogs: state.searchData.data,
 showSearch: state.searchData.showSearch,
});

const mapDispatchToProps = (dispatch) => {
 return {
  showSearchChange: (payload) => dispatch(showSearchChange(payload)),
 };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
