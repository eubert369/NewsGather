import React from "react";
import Head from "next/head";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>NewsGather</title>
      </Head>{" "}
      <main>{children}</main>
    </>
  );
}

export default Layout;
