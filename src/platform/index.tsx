import React, { FC } from "react";
import Header from "./Header";
import Menu from "./Menu";
import "./index.less";

const Platform: FC<any> = (props) => {
  const children = props.children;
  return (
    <div className="platform-wrapper">
      <header className="header">
        <Header />
      </header>
      <div className="body">
        <div className="menu">
          <Menu />
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Platform;
