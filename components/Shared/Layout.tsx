import Head from "next/head";
import NavBar from "./NavBar";
import NavItem from "./NavItem";

function Layout({ children }: any) {
  return (
    <>
      <Head>
        <title>NextJS Movie App</title>
        <meta name="description" content="nextjs movie app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <NavBar title="Movies">
          <NavItem title="Home" href="/" />
          <NavItem title="Movies" href="/movie" /> 
        </NavBar>

        <main className="">          
          {children}
        </main>

        <footer className=""></footer>
      </div>

      
    </>
  );
}

export default Layout;
