import React, { FC, useState, useEffect } from "react";
import {
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  MinusOutlined,
  CaretRightOutlined,
  CaretDownOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import "./index.less";

interface TreeItem<T = any> {
  id?: number;
  stepName: string;
  stepDesc?: string;
  level: number;
  parentId: number | null;
  leaf: number;
  sort: number;
  subList?: T[];
}

interface TreeListItem extends TreeItem<TreeListItem> {
  _label: string;
  _isSelected: boolean;
  _isExpanded: boolean;
}

interface OperationTreePropsInterface {
  dataSource: TreeItem<TreeItem>[];
  onChange: (index: any, list: any) => void;
}

const OperationTree: FC<OperationTreePropsInterface> = (props) => {
  const { dataSource, onChange } = props;
  const [list, setList] = useState<TreeListItem[]>([]);
  const [currentItem, setCurrentItem] = useState<TreeListItem>();

  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      let listData = createTreeData(dataSource);
      setList(listData);
      setCurrentItem(listData[0]);
    }
  }, [dataSource]);

  useEffect(() => {
    if (currentItem && list.length > 0) {
      let nextListData = changeTreeData(list, currentItem);
      setList([...nextListData]);
    }
  }, [currentItem]);

  const handleBtnClick = (k: "add" | "add_child" | "del" | "up" | "down") => {
    let nextTreeNode: TreeListItem = {
      level: 1,
      leaf: 1,
      sort: 0,
      stepName: "",
      stepDesc: "",
      parentId: null,
      subList: undefined,
      _label: "",
      _isSelected: true,
      _isExpanded: true,
    };

    if (k === "add") {
      // 不能同时添加多条数据
      if (list[list.length - 1].id === undefined) {
        return;
      }
      if (currentItem) {
        const sort = list.length;

        nextTreeNode = {
          ...currentItem,
          id: undefined,
          leaf: 1,
          sort: sort + 1,
          stepName: `阶段 ${sort + 1}`,
          stepDesc: "",
          subList: undefined,
          _label: `阶段 ${sort + 1}`,
          _isSelected: true,
          _isExpanded: true,
        };
        if (currentItem.level === 2) {
          let parent = list.find((item) => {
            return currentItem.parentId === item.id;
          });
          if (parent?.subList) {
            parent.subList = [...parent.subList, nextTreeNode];
            setList([...list, parent]);
            setCurrentItem(nextTreeNode);
          }
        } else {
          setCurrentItem(nextTreeNode);
          setList([...list, nextTreeNode]);
        }
      } else {
        setCurrentItem(nextTreeNode);
        setList([...list, nextTreeNode]);
      }
    }
    if (k === "add_child") {
      // 不能同时添加多条数据
      if (list[list.length - 1].id === undefined) {
        return;
      }
      if (currentItem) {
        const newSort = currentItem.subList?.length || 0;

        nextTreeNode = {
          ...currentItem,
          id: undefined,
          level: 2,
          leaf: 1,
          sort: newSort,
          stepName: `子阶段 ${newSort + 1}`,
          stepDesc: "",
          parentId: null,
          subList: undefined,
          _label: `子阶段 ${newSort + 1}`,
          _isSelected: true,
          _isExpanded: true,
        };
        if (currentItem.subList) {
          currentItem.subList = [...currentItem.subList, nextTreeNode];
        } else {
          currentItem.subList = [nextTreeNode];
        }
        let nextList = changeTreeData(list, nextTreeNode);
        console.log(nextList);
        setCurrentItem(nextTreeNode);
        setList(nextList);
      }
    }
    if (k === "del") {
      // if (list.length === 0) return;
      // let nexNum = num;
      // if (nexNum > list.length - 1 && nexNum > 0) {
      //   nexNum = nexNum - 1;
      // }
      // list.splice(nexNum, 1);
      // let nextList = list.map((item, index) => {
      //   return { ...item, _label: `阶段 ${index + 1} ` };
      // });
      // setList([...nextList]);
      // setNum(num === 0 ? 0 : num - 1);
    }
    if (k === "up") {
      // let preIndex = num - 1 >= 0 ? num - 1 : 0;
      // const preItem = list[preIndex];
      // const _label = preItem._label;
      // list[preIndex] = list[num];
      // list[num] = preItem;
      // list[num]._label = list[preIndex]._label;
      // list[preIndex]._label = _label;
      // setList([...list]);
      // setNum(preIndex);
    }
    if (k === "down") {
      //   let nextIndex = num + 1 <= list.length - 1 ? num + 1 : list.length - 1;
      //   const nextItem = list[nextIndex];
      //   const _label = nextItem._label;
      //   list[nextIndex] = list[num];
      //   list[num] = nextItem;
      //   list[num]._label = list[nextIndex]._label;
      //   list[nextIndex]._label = _label;
      //   setList([...list]);
      //   setNum(nextIndex);
    }
  };

  const handleItemSelected = (item: TreeListItem) => {
    item._isSelected = true;
    setCurrentItem(item);
  };

  const handleItemExpanded = (item: TreeListItem) => {
    item._isSelected = true;
    item._isExpanded = !item._isExpanded;
    setCurrentItem(item);
  };

  const createTreeNode = (treeList: TreeListItem[]) => {
    return (
      <ul>
        {treeList.map((item, index) => {
          const { id, subList } = item;
          if (subList && subList.length > 0) {
            return (
              <OperationTreeItem
                data={item}
                onClick={handleItemSelected}
                onExpanded={handleItemExpanded}
                key={id}
              >
                {createTreeNode(subList)}
              </OperationTreeItem>
            );
          }
          return (
            <OperationTreeItem
              data={item}
              onClick={handleItemSelected}
              onExpanded={handleItemExpanded}
              key={id}
            />
          );
        })}
      </ul>
    );
  };

  return (
    <div className="operation-tree">
      <div className="ot-header">
        <PlusOutlined onClick={() => handleBtnClick("add")} />
        {currentItem?.level === 1 && (
          <BlockOutlined onClick={() => handleBtnClick("add_child")} />
        )}
        <ArrowUpOutlined onClick={() => handleBtnClick("up")} />
        <ArrowDownOutlined onClick={() => handleBtnClick("down")} />
        <MinusOutlined onClick={() => handleBtnClick("del")} />
      </div>
      <div className="ot-container">{createTreeNode(list)}</div>
    </div>
  );
};

interface OperationTreeItemPropsInterface {
  data: TreeListItem;
  onClick: (item: TreeListItem) => void;
  onExpanded: (item: TreeListItem) => void;
}

const OperationTreeItem: FC<OperationTreeItemPropsInterface> = (props) => {
  const { data, onClick, onExpanded, children } = props;
  const { leaf, _isExpanded, _isSelected, _label, stepName } = data;
  return (
    <li className="ot-list-item-wrapper">
      <div className="ot-list-item">
        {leaf === 0 &&
          (_isExpanded ? (
            <CaretDownOutlined
              onClick={(e) => {
                onExpanded(data);
                e.stopPropagation();
              }}
            />
          ) : (
            <CaretRightOutlined
              onClick={(e) => {
                onExpanded(data);
                e.stopPropagation();
              }}
            />
          ))}
        <div
          onClick={(e) => {
            onClick(data);
            e.stopPropagation();
          }}
          className={`ot-list-item-content ${
            _isSelected ? "ot-list-item-active" : ""
          }`}
        >
          <label>{_label}</label>
          <span>{stepName}</span>
        </div>
      </div>
      {_isExpanded && children && (
        <div className="ot-child-container">{children}</div>
      )}
    </li>
  );
};

interface createTreeDataInterface {
  (dataSource: TreeItem[]): TreeListItem[];
}

const createTreeData: createTreeDataInterface = (dataSource) => {
  let listData = dataSource.map((item, index) => {
    const { sort, level, subList } = item;
    if (subList && subList.length > 0) {
      item.subList = createTreeData(subList);
    }
    return {
      ...item,
      _label: level === 1 ? `阶段 ${sort + 1}` : `子阶段 ${sort + 1}`,
      _isSelected: false,
      _isExpanded: level === 1,
    } as TreeListItem;
  });

  return listData;
};

interface changeTreeDataInterface {
  (dataSource: TreeListItem[], currentItem: TreeListItem): TreeListItem[];
}

const changeTreeData: changeTreeDataInterface = (dataSource, currentItem) => {
  let listData = dataSource.map((item, index) => {
    const { subList } = item;
    if (currentItem.id === item.id) {
      item = currentItem;
    } else {
      if (currentItem.id) {
        item._isSelected = false;
      }
    }
    if (subList && subList.length > 0) {
      item.subList = changeTreeData(subList, currentItem);
    }
    return item;
  });
  return listData;
};

export default OperationTree;
