import React from 'react';
import App from 'next/app';
import { wrapper } from '../redux/store';
import { withRouter } from 'next/router';
import { getLocalStorage } from '../sharedComponents/helpers';
import CreateBlogButton from '../sharedComponents/createBlogButton';
import Header from '../sharedComponents/Header';
import '../styles/global.scss';

class MyApp extends App {
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
  const hideHeader = router.pathname === "/login" || router.pathname === "/signup";
  const user = getLocalStorage('user');
  const hideCreateBlogButton = router.pathname === "/create";
  return (
    <>
      {!hideHeader && <Header />}
      <Component {...pageProps} />
      {user && !hideCreateBlogButton && !hideHeader && <CreateBlogButton />}
    </>
  );
 }
}

export default wrapper.withRedux(withRouter(MyApp));
