import React from 'react';
import App from 'next/app';
import { wrapper } from '../redux/store';
import Header from '../sharedComponents/Header/header';
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
  const { Component, pageProps } = this.props;

  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
 }
}

export default wrapper.withRedux(MyApp);
