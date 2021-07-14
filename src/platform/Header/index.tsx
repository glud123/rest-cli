import React, { FC } from "react";
import { AppstoreFilled, MediumSquareFilled } from "@ant-design/icons";
import "./index.less";

const Header: FC<any> = (props) => {
  const children = props.children;
  return (
    <div className="header-wrapper">
      <div className="title-wrapper">
        <MediumSquareFilled />
        <span className="title">标题</span>
      </div>
      <div>
        <AppstoreFilled />
      </div>
    </div>
  );
};

export default Header;
