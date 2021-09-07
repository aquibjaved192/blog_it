import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../renderField';
import { withRouter } from 'next/router';
import { maxLength50, minLength5 } from '../../validation/validations';
import TrendingBlog from '../Trends/trendingBlog';
import style from './header.module.scss';
import { getLocalStorage, removeLocalStorage } from '../helpers';

class Navigation extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  componentDidMount() {
    const user = getLocalStorage('user');
    this.setState({
      isLoggedIn: user ? true : false
    })
  }

  checkMobile = () => {
    const { hideMobileMenu } = this.props;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      hideMobileMenu();
    }
  }

  onClickLogout = () => {
    removeLocalStorage('user');
    window.location.replace('/');
  };

  onClickLogin = () => {
    const { router } = this.props;
    router.push('/login');
  };

  onClickHome = () => {
    const { router } = this.props;
    this.checkMobile();
    router.push('/');
  };

  onClickProfile = (id) => {
    const { router } = this.props;
    this.checkMobile();
    router.push('/profile/[id]', `/profile/${id}`);
  };

  onSubmit = async (values) => {
    const { router, showSearchChange } = this.props;
    if(values.search) {
      const key  = values.search.trim().toLowerCase().split(" ").join("%20");
      showSearchChange(false);
      router.push('/search/[id]', `/search/${key}`)
    }
  }

  searchOnChange = (value) => {
    const { search, router } = this.props;
    if(router.pathname !== "/search/[id]"){
      search(value, true);
    }
  };


  render(){
    const {
      handleSubmit,
      router,
      searchData,
      showSearch,
      showSearchChange,
    } = this.props;

    const { isLoggedIn } = this.state;
    const user = getLocalStorage('user');
    const searchResults = Array.isArray(searchData) ? searchData.map(item => (
      <div onClick={() => router.push('/blog/[id]', `/blog/${item._id}`)}  key={item._id}>
          <TrendingBlog blog={item}/>
      </div>
    )) : [];
    return (
      <>
        <form
          id="searchForm"
          className={style.searchForm}
          onSubmit={handleSubmit(this.onSubmit)}
        >
          <Field
            name="search"
            className="form-control form-control-lg"
            component={RenderField}
            validate={[maxLength50, minLength5]}
            type="text"
            placeholder="Search by title..."
            size="lg"
            searchOnChange={this.searchOnChange}
            showSearchChange={showSearchChange}
          />
          <button type="submit" className={`${style.searchBtn} border-secondary font-weight-bold`}>
            search
          </button>
          {showSearch && (
            <div className={`scrollBar ${style.searchList}`}>
              {searchResults.length > 0 ? searchResults : <div className="m-0 text-center pt-4 text-white-50">No matches found</div>}
            </div>
          )}
        </form>
        <div id="navList" className={style.navList}>
          <ul className={style.navItems}>
            {isLoggedIn ? (
              <>
                <li
                  className={router.pathname === '/' ? 'color-primary' : 'text-white'}
                  onClick={this.onClickHome}
                >
                  Home
                </li>
                <li
                  className={router.pathname === '/profile/[id]' ? 'color-primary' : 'text-white'}
                  onClick={() => this.onClickProfile(user.id)}
                >
                  Profile
                </li>
                <li
                  className='text-white'
                  onClick={this.onClickLogout}
                >
                  Logout
                </li>
              </>
            ) : (
                <li className='text-white' onClick={this.onClickLogin}>SignIn</li>
              )
            }
          </ul>
        </div>
      </>
    );
  }
}

export default withRouter(
  reduxForm({
    form: 'search',
  })(Navigation)
);
