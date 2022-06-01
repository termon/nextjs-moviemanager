import 'bootstrap/dist/css/bootstrap.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import Layout from '../components/Shared/Layout'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <>
      {(pageProps.error) && <h4>Error: {pageProps.error?.statusCode} - {pageProps.error?.message} </h4>}
      <Component {...pageProps} />
      </>
    </Layout>
  )
}

export default MyApp

/*
pageprops can contain an error prop and this can render an error component

import Error from "next/error";

function MyApp({Component, pageProps}) {
  if (pageProps.error) {
    return <Error statusCode={pageProps.error.statusCode} title={pageProps.error.message} />;
  }
  return (
    <Component {...pageProps} />
  );
}

export default MyApp;

*/