import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import RenderField from '../renderField';
import { withRouter } from 'next/router';
import { maxLength50, minLength8 } from '../../validation/validations';
import { search } from '../../redux/reducers/getSearchReducer';
import style from './header.module.scss';
import { removeLocalStorage, getLocalStorage } from '../helpers';

function Navigation(props) {
 const {
  handleSubmit,
  onSubmit,
  onClickLogout,
  onClickLogin,
  onClickHome,
  onClickProfile,
  pathname,
 } = props;
 const user = getLocalStorage('user');
 return (
  <>
   <form
    id="searchForm"
    className={style.searchForm}
    onSubmit={handleSubmit(onSubmit)}
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
    {user ? (
     <ul className={style.navItems}>
      <li
        className={pathname === '/' ? 'color-primary' : 'text-white'}
        onClick={onClickHome}
      >
        Home
      </li>
      <li
        className={pathname === '/profile/[id]' ? 'color-primary' : 'text-white'}
        onClick={() => onClickProfile(user.id)}
      >
        Profile
      </li>
      <li
        className='text-white'
        onClick={onClickLogout}
      >
        Logout
      </li>
     </ul>
    ) : (
     <ul className={style.navItems}>
      <li className='text-white' onClick={onClickLogin}>SignIn</li>
     </ul>
    )}
   </div>
  </>
 );
}

class Header extends React.PureComponent {
 constructor(props) {
  super(props);
 }

 onSubmit = async (values) => {
  const { search, router } = this.props;
  if(values.search){
    if (router.pathname !== '/') {
      await router.push('/');
    }
    search(values.search);
  }
 };

 showMobileMenu = () => {
  document.getElementById('searchForm').style.display = 'flex';
  document.getElementById('navList').style.display = 'block';
  document.getElementById('menuOpen').style.display = 'none';
  document.getElementById('menuClose').style.display = 'block';
 };

 hideMobileMenu = () => {
  document.getElementById('searchForm').style.display = 'none';
  document.getElementById('navList').style.display = 'none';
  document.getElementById('menuClose').style.display = 'none';
  document.getElementById('menuOpen').style.display = 'block';
 };

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
  router.push('/');
 };

 onClickProfile = (id) => {
  const { router } = this.props;
  router.push(`/profile/${id}`);
 };

 render() {
  const { handleSubmit, router } = this.props;
  return (
   <div className={style.parentContainer}>
    <div
     className={`${style.container} d-flex justify-content-between align-items-center pl-3 pr-3`}
    >
     <button className="border-0 bg-transparent w-25 text-left text-white" onClick={this.onClickHome}>
      <h3 className="m-0 font-weight-bold">BLOG!T</h3>
     </button>
     <Navigation
      onClickLogout={this.onClickLogout}
      onSubmit={this.onSubmit}
      handleSubmit={handleSubmit}
      onClickLogin={this.onClickLogin}
      onClickHome={this.onClickHome}
      onClickProfile={this.onClickProfile}
      pathname={router.pathname}
     />
     <div className={style.menuBtn} id="menuOpen" onClick={this.showMobileMenu}>
      <div className={style.menuIcon} />
      <div className={style.menuIcon} />
      <div className={style.menuIcon} />
     </div>
     <div
      className={style.menuClose}
      id="menuClose"
      onClick={this.hideMobileMenu}
     >
      X
     </div>
    </div>
   </div>
  );
 }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
 return {
  search: (key) => dispatch(search(key)),
 };
};

export default withRouter(
 reduxForm({
  form: 'search',
 })(connect(mapStateToProps, mapDispatchToProps)(Header))
);
