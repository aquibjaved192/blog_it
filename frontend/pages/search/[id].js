import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { search } from '../../redux/reducers/getSearchReducer';
import BlogCard from '../../sharedComponents/cards/blogCard';
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
    const { searchData } = this.props;
    const searchResults = (Array.isArray(searchData) && searchData.length > 0) ? 
      searchData.map(item => (
        <BlogCard blog={item} key={item._id}/>
      )) : 
      <h5 className="text-center font-weight-bold text-white w-100">No records found for this search</h5>;
      
    return(
      <div className={`col-lg-8 col-12 ${style.container}`}>
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