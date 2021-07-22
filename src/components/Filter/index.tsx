import React, { FC } from "react";
import "./index.less";

const Filter: FC<any> = (props) => {
  const { children } = props;
  return <div className="filter-wrapper">{children}</div>;
};

export default Filter;
