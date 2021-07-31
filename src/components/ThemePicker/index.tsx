import React, { useState } from "react";
import { Dropdown } from "antd";
import { CirclePicker } from "react-color";
import "./index.less";

const ThemePicker = () => {
  const [color, setColor] = useState("#00bcd4");

  const handleChange = (color: { hex: any }) => {
    console.log(color);
    setColor(color.hex);
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
