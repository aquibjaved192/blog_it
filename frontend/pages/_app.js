import React from 'react';
import App from 'next/app';
import { wrapper } from '../redux/store';
import { withRouter } from 'next/router';
import Router from 'next/router';
import { getLocalStorage } from '../sharedComponents/helpers';
import CreateBlogButton from '../sharedComponents/createBlogButton';
import Header from '../sharedComponents/Header';
import '../styles/global.scss';

class MyApp extends App {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    }
  }

  componentDidMount() {
    const user = getLocalStorage('user');
    this.setState({
      isLoggedIn: user ? true : false,
    })
    Router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
    });
  }

  static getInitialProps = async ({ Component, ctx }) => {
    return {
    pageProps: {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
      pathname: ctx.pathname,
    },
    };
  };

  render() {
    const { Component, pageProps, router } = this.props;
    const { isLoggedIn } = this.state;
    const hideHeader = router.pathname === "/login" || router.pathname === "/signup";
    const hideCreateBlogButton = router.pathname === "/create";
    return (
      <>
        {!hideHeader && <Header />}
        <Component {...pageProps} />
        {isLoggedIn && !hideCreateBlogButton && !hideHeader && <CreateBlogButton />}
      </>
    );
  }
}

export default wrapper.withRedux(withRouter(MyApp));
