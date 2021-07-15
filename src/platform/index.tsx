import React, { FC } from "react";
import Header from "./Header";
import Menu from "./Menu";
import OperationArea from "./OperationArea";
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
        <div className="content">
          <div className="operation-area">
            <OperationArea />
          </div>
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
