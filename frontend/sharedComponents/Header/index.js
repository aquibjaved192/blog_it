import React from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import { search, showSearchChange } from '../../redux/reducers/getSearchReducer';
import style from './header.module.scss';
import Navigation from './navigation'

class Header extends React.PureComponent {
  showMobileMenu = () => {
    document.getElementById('navList').style.display = 'block';
    document.getElementById('menuOpen').style.display = 'none';
    document.getElementById('menuClose').style.display = 'block';
  };

  hideMobileMenu = () => {
    document.getElementById('navList').style.display = 'none';
    document.getElementById('menuClose').style.display = 'none';
    document.getElementById('menuOpen').style.display = 'block';
  };

  render() {
    const { search, searchData, showSearch, showSearchChange } = this.props;
    return (
      <div className={style.parentContainer}>
        <div
          className={`${style.container} d-flex justify-content-between align-items-center pl-0 pr-0 pl-lg-3 pr-lg-3`}
        >
          <button className="border-0 bg-transparent text-left text-white" onClick={this.onClickHome}>
            <h3 className="m-0 font-weight-bold d-none d-md-bock d-lg-block">BLOG!T</h3>
            <h3 className="m-0 font-weight-bold d-block d-lg-none">!T</h3>
          </button>
          <Navigation
            onSubmit={this.onSubmit}
            hideMobileMenu={this.hideMobileMenu}
            search={search}
            showSearch={showSearch}
            searchData={searchData}
            showSearchChange={showSearchChange}
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
            &times;
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchData: state.searchData.data,
  showSearch: state.searchData.showSearch,
});

const mapDispatchToProps = (dispatch) => {
  return {
    search: (key, value) => dispatch(search(key, value)),
    showSearchChange: (value) => dispatch(showSearchChange(value))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
