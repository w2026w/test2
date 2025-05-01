import React from "react";

import Header from "./Header/Header";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div className="container con-row">
        <Header />
        {children}
      </div>
    </React.Fragment>
  );
};

export default Layout;
