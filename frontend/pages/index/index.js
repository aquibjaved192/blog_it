import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import BlogCard from '../../sharedComponents/blogCard';
import Trends from '../../sharedComponents/Trends';
import { showSearchChange } from '../../redux/reducers/getSearchReducer';
import axios from 'axios';
import style from './home.module.scss';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      trends: []
    }
  }

  componentDidMount() {
    const { data } = this.props;
    const arr = [...data];
    this.setState ({
      trends : arr.sort((a, b) => b.hits - a.hits).slice(0, 3),
    })
  }

  componentWillUnmount() {
    const { showSearchChange } = this.props;
    showSearchChange(false);
  }

  render() {
    let showBlogs = [];
    const { searchBlogs, showSearch, data } = this.props;
    showBlogs = showSearch ? searchBlogs : data;
    const blogCards =
    showBlogs.length > 0 &&
    showBlogs.map((blog) => {
      return <BlogCard key={blog._id} blog={blog} />;
    });

    const { trends } = this.state;

    return (
      <div className={style.container}>
        <div className={`d-flex banner ${style.homeBanner}`}>
          <h2 className="text-white font-weight-bold ml-4">"Stay faithful to the stories in your head"</h2>
          <div className="coverPhotoShade" />
        </div>
        <div className="row ml-0 mr-0 mb-4 banner-body-margin justify-content-around">
          <div className="col-12 mb-5 col-lg-3">
            <Trends
              heading="Top Trending"
              trends={trends}
            />
          </div>
          <div className="row m-0 col-lg-8 col-12">
            {blogCards}
          </div>
        </div>
      </div>
    );
  }
}

export async function getStaticProps() {
  const res = await axios.get('http://localhost:5000/getAllBlogs');
  const data = res.data.data;
  return {
    props: {
    data,
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
