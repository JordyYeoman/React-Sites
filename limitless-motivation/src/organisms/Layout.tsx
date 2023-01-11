import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props: any) {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
