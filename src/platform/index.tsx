import React, { FC } from "react";
import Header from "./Header";
import Menu from "./Menu";
import OperationArea from "./OperationArea";
import "./index.less";

const Platform: FC<any> = (props) => {
  const children = props.children;
  return (
    <div className="platform-wrapper">
      <header className="pw-header">
        <Header />
      </header>
      <div className="pw-body">
        <div className="pw-menu">
          <Menu />
        </div>
        <div className="pw-content">
          <div className="pw-operation-area">
            <OperationArea />
          </div>
          <div className="pw-container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
