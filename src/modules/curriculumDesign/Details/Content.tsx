import React from "react";
import OperationList from "@/components/OperationList";

const Content = () => {
  return (
    <div className="curriculum-content">
      <div className="cc-left">
        <OperationList data={[]} />
      </div>
      <div className="cc-right"></div>
    </div>
  );
};

export default Content;
