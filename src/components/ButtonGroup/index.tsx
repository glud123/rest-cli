import React, { FC } from "react";
import { Button } from "antd";
import "./index.less";

import type { ButtonProps } from "antd/lib/button/button";

export interface ButtonInterface extends ButtonProps {
  key: string;
}

interface ButtonGroupPropsInterface {
  onClick: (key: string) => void;
  options?: ButtonInterface[];
}

const ButtonGroup: FC<ButtonGroupPropsInterface> = (props) => {
  const { options, onClick } = props;
  return (
    <div className="button-group-wrapper">
      {options &&
        options.map((option) => {
          const { key, name, ...btn_props } = option;
          return (
            <Button
              {...btn_props}
              onClick={() => {
                onClick && onClick(key);
              }}
              key={key}
            >
              {name}
            </Button>
          );
        })}
    </div>
  );
};

export default ButtonGroup;
