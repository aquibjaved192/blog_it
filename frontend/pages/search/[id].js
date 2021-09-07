import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { search } from '../../redux/reducers/getSearchReducer';
import TrendingBlog from '../../sharedComponents/Trends/trendingBlog';
import style from './search.module.scss';

class Search extends React.PureComponent {
  componentDidMount() {
    this.searchKey()
  }

  componentDidUpdate(prevProps) {
    const { router } = this.props;
    if(prevProps.router.query.id !== router.query.id) {
      this.searchKey();
    }
  }

  searchKey = () => {
    const { search, router } = this.props;
    const key = router.query.id.split("%20").join(" ");
    search(key, false);
  }

  render() {
    const { searchData, router } = this.props;
    const searchResults = Array.isArray(searchData) ? searchData.map(item => (
      <div onClick={() => router.push('/blog/[id]', `/blog/${item._id}`)}>
          <TrendingBlog key={item._id} blog={item}/>
      </div>
    )) : [];
    return(
      <div className={style.container}>
        {searchResults}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  searchData: state.searchData.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    search: (key, value) => dispatch(search(key, value)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));