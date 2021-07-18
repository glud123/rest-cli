import React from "react";
import OperationList from "@/components/OperationList";

const Content = () => {
  const handleChange = (list: { value: string; [k: string]: any }[]) => {
    console.log(list);
  };
  return (
    <div className="curriculum-content">
      <div className="cc-left">
        <OperationList data={[]} onChange={handleChange} />
      </div>
      <div className="cc-right"></div>
    </div>
  );
};

export default Content;
