import React, { useState } from "react";
import { Dropdown } from "antd";
import { CirclePicker } from "react-color";
import Message from "../Message";
import "./index.less";

const ThemePicker = () => {
  const [color, setColor] = useState("#00bcd4");

  const handleChange = (color: { hex: any }) => {
    setColor(color.hex);
    (window as any).less
      .modifyVars({
        "@primary-color": color.hex,
      })
      .then(() => {
        Message.open({ type: "success", message: "修改主题色成功！" });
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  return (
    <div className="theme-wrapper">
      <Dropdown
        arrow
        placement="bottomLeft"
        overlay={
          <div className="theme-picker">
            <CirclePicker color={color} onChange={handleChange} />
          </div>
        }
      >
        <div className="theme-block">
          <div style={{ backgroundColor: color }} />
        </div>
      </Dropdown>
    </div>
  );
};

export default ThemePicker;
