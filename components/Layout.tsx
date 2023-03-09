import Head from "next/head";
import React from "react";
import Footer from "./Footer";

import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Book a Private</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
