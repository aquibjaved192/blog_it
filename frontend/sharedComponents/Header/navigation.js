import React from 'react';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../renderField';
import { withRouter } from 'next/router';
import { maxLength50, minLength8 } from '../../validation/validations';
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

  onClickLogout = () => {
    removeLocalStorage('user');
    window.location.replace('/');
  };

  onClickLogin = () => {
    const { router } = this.props;
    router.push('/login');
  };

  onClickHome = () => {
    const { router, hideMobileMenu } = this.props;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      hideMobileMenu();
    }
    router.push('/');
  };

  onClickProfile = (id) => {
    const { router, hideMobileMenu } = this.props;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      hideMobileMenu();
    }
    router.push('/profile/[id]', `/profile/${id}`);
  };

  onSubmit = async (values) => {
    const { search, router } = this.props;
    if(values.search){
      if (router.pathname !== '/') {
        await router.push('/');
      }
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      if (isMobile) {
        this.hideMobileMenu();
      }
      search(values.search);
    }
  };


  render(){
    const {
      handleSubmit,
      router,
    } = this.props;

    const { isLoggedIn } = this.state;
  
    const user = getLocalStorage('user');
   
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
            validate={[maxLength50, minLength8]}
            type="text"
            placeholder="Search by title..."
            size="lg"
          />
          <button type="submit" className={`${style.searchBtn} border-secondary font-weight-bold`}>
            search
          </button>
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
