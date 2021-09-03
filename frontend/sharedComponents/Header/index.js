import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { search } from '../../redux/reducers/getSearchReducer';
import style from './header.module.scss';
import Navigation from './navigation'

class Header extends React.PureComponent {
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

  render() {
    const { search } = this.props;
    return (
      <div className={style.parentContainer}>
        <div
        className={`${style.container} d-flex justify-content-between align-items-center pl-3 pr-3`}
        >
          <button className="border-0 bg-transparent w-25 text-left text-white" onClick={this.onClickHome}>
            <h3 className="m-0 font-weight-bold">BLOG!T</h3>
          </button>
          <Navigation
            onSubmit={this.onSubmit}
            hideMobileMenu={this.hideMobileMenu}
            search={search}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
