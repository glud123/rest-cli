import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";
import OperationArea from "./OperationArea";
import "./index.less";

const Platform: FC<any> = (props) => {
  const children = props.children;
  const location = useLocation();

  return (
    <div className="platform-wrapper">
      <header className="pw-header">
        <Header />
      </header>
      <div className="pw-body">
        <Menu />
        <div className="pw-content">
          {location.pathname !== "/" && (
            <div className="pw-operation-area">
              <OperationArea />
            </div>
          )}
          <div className="pw-container">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Platform;
