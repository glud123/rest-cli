import React, { FC, useState, useEffect } from "react";
import {
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
} from "@ant-design/icons";
import "./index.less";

interface OperationListInterface {
  data: { value: string; [k: string]: any }[];
  onChange?: (
    activeIndex: number | undefined,
    list: { value: string; [k: string]: any }[]
  ) => void;
  onAdd?: () => void;
  onDelete?: () => void;
  onUp?: () => void;
  onDown?: () => void;
}

const OperationList: FC<OperationListInterface> = (props) => {
  const { data, onChange } = props;

  const [list, setList] = useState<
    {
      _label: string;
      value: string;
      [k: string]: any;
    }[]
  >([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    if (data && data.length > 0) {
      let nextList = data.map((item, index) => {
        const { value, ...args } = item;
        return {
          _label: `阶段 ${index + 1} `,
          value: value,
          ...args,
        };
      });
      setList(nextList);
    }
  }, [data]);

  useEffect(() => {
    let newList = list.map((item) => {
      const { _label, value, ...args } = item;
      return { value, ...args };
    });
    onChange &&
      onChange(num === 0 && newList.length === 0 ? undefined : num, newList);
  }, [list, num]);

  const handleBtnClick = (k: "add" | "del" | "up" | "down") => {
    if (k === "add") {
      setList([
        ...list,
        {
          _label: `阶段 ${list.length + 1} `,
          value: `阶段 ${list.length + 1} `,
        },
      ]);
      setNum(list.length);
    }
    if (k === "del") {
      if (list.length === 0) return;
      let nexNum = num;
      if (nexNum > list.length - 1 && nexNum > 0) {
        nexNum = nexNum - 1;
      }
      list.splice(nexNum, 1);
      let nextList = list.map((item, index) => {
        return { ...item, _label: `阶段 ${index + 1} ` };
      });
      setList([...nextList]);
      setNum(num === 0 ? 0 : num - 1);
    }
    if (k === "up") {
      let preIndex = num - 1 >= 0 ? num - 1 : 0;
      const preItem = list[preIndex];
      const _label = preItem._label;
      list[preIndex] = list[num];
      list[num] = preItem;
      list[num]._label = list[preIndex]._label;
      list[preIndex]._label = _label;
      setList([...list]);
      setNum(preIndex);
    }
    if (k === "down") {
      let nextIndex = num + 1 <= list.length - 1 ? num + 1 : list.length - 1;
      const nextItem = list[nextIndex];
      const _label = nextItem._label;
      list[nextIndex] = list[num];
      list[num] = nextItem;
      list[num]._label = list[nextIndex]._label;
      list[nextIndex]._label = _label;
      setList([...list]);
      setNum(nextIndex);
    }
  };

  return (
    <div className="operation-list">
      <div className="ol-header">
        <PlusOutlined onClick={() => handleBtnClick("add")} />
        <ArrowUpOutlined onClick={() => handleBtnClick("up")} />
        <ArrowDownOutlined onClick={() => handleBtnClick("down")} />
        <MinusOutlined onClick={() => handleBtnClick("del")} />
      </div>
      <div className="ol-container">
        <ul className="ol-ul">
          {list.map((item, index) => {
            const { _label, value, ...args } = item;
            return (
              <li
                key={index}
                className={`ol-list-item ${num === index ? "ol-active" : ""}`}
                onClick={() => {
                  setNum(index);
                }}
              >
                <label>{_label}</label>
                <span>{value}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OperationList;
