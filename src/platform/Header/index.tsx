import React, { FC } from "react";
import { MediumSquareFilled } from "@ant-design/icons";
import Setting from "../Setting";

const Header: FC<any> = (props) => {
  const children = props.children;
  return (
    <div className="header-wrapper">
      <div className="hw-title-wrapper">
        <MediumSquareFilled />
        <span className="hw-title">标题</span>
      </div>
      <Setting />
    </div>
  );
};

export default Header;
