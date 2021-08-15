import React, { FC } from "react";
import { Space } from "antd";
import "./index.less";

interface ListInnerBittonItem {
  key: string;
  name: string;
  onClick: (key: string, record: any) => void;
}

interface ListInnerBittonGroupPropsInterface {
  options: ListInnerBittonItem[];
  record: any;
}

const ListInnerBittonGroup: FC<ListInnerBittonGroupPropsInterface> = (
  props
) => {
  const { options, record } = props;
  return (
    <Space size="middle">
      {options.map((item) => {
        const { key, name, onClick } = item;
        return (
          <span
            className="list-inner-button"
            key={key}
            onClick={() => {
              onClick(key, record);
            }}
          >
            {name}
          </span>
        );
      })}
    </Space>
  );
};

export default ListInnerBittonGroup;
