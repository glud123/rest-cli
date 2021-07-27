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

  const handleBtnClick = (k: "add" | "add_child" | "del" | "up" | "down") => {
    // 如果有新增状态的数据，则不允许操作
    let flag = checkTreeDataHasNew(list);
    // TODO: 添加提示 请先保存阶段内容，再进行操作
    if (flag) return;

    // 新增节点操作
    if (k === "add" || k === "add_child") {
      // 使用初始状态的列表数据
      let restList = resetTreeData(list);
      // 新增树节点
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
      // 新增一级节点
      if (k === "add") {
        if (!currentItem || (currentItem && currentItem.level === 1)) {
          // 添加一级节点
          const sort = restList.length;
          let label = `阶段 ${sort + 1}`;
          nextTreeNode.sort = sort;
          nextTreeNode.stepName = label;
          nextTreeNode._label = label;
          setCurrentItem(nextTreeNode);
          setList([...restList, nextTreeNode]);
        }
        if (currentItem && currentItem.level === 2) {
          // 选中二级节点添加二级节点
          const { parentId } = currentItem as TreeListItem;
          // 通过当前选中的节点找到共同父节点
          let parentItem = restList.find((item) => item.id === parentId);
          const { id, subList } = parentItem as TreeListItem;
          const sort = (subList as TreeListItem[]).length;
          let label = `子阶段 ${sort + 1}`;
          nextTreeNode.sort = sort;
          nextTreeNode.stepName = label;
          nextTreeNode._label = label;
          nextTreeNode.level = 2;
          nextTreeNode.parentId = id as number | null;
          ((parentItem as TreeListItem).subList as TreeListItem[]) = [
            ...(subList as TreeListItem[]),
            nextTreeNode,
          ];
          setCurrentItem(nextTreeNode);
          setList([...restList]);
        }
      }
      // 新增二级节点
      if (k === "add_child") {
        const { id, subList } = currentItem as TreeListItem;
        // 选中 一级 节点 情况下添加 二级节点
        if (!subList) {
          (currentItem as TreeListItem).subList = [];
        }
        let childList = (currentItem as TreeListItem).subList;
        const sort = (childList as TreeListItem[]).length;
        let label = `子阶段 ${sort + 1}`;
        nextTreeNode.sort = sort;
        nextTreeNode.stepName = label;
        nextTreeNode._label = label;
        nextTreeNode.level = 2;
        nextTreeNode.parentId = id as number | null;
        (currentItem as TreeListItem).subList = [
          ...(childList as TreeListItem[]),
          nextTreeNode,
        ];
        setCurrentItem(nextTreeNode);
        let nextList = restList.map((item) => {
          if (item.id === id) {
            return currentItem as TreeListItem;
          }
          return item;
        });
        setList([...nextList]);
      }
    }
    if (k === "del") {
      if (currentItem && currentItem.level === 1) {
        if (currentItem.subList && currentItem.subList.length > 0) {
          // TODO: 添加提示 请先删除子阶段后在操作
          return;
        }
      }
      if (currentItem && currentItem.level === 2) {
        // TODO: 添加提示 是否要删除当前阶段
        return;
      }
    }
    if (k === "up" || k === "down") {
      const { sort, level } = currentItem as TreeListItem;

      if (k === "up") {
        if (level === 1) {
          if (sort === 0) {
            return;
          }
          let pre = sort - 1 >= 0 ? sort - 1 : 0;
          const preItem = list[pre];
          const _label = preItem._label;
          const _sort = preItem.sort;
          list[pre] = list[sort];
          list[sort] = preItem;
          list[sort].sort = list[pre].sort;
          list[pre].sort = _sort;
          list[sort]._label = list[pre]._label;
          list[pre]._label = _label;

          setList([...list]);
          setCurrentItem(list[pre]);
        }
        if (level === 2) {
        }
      }

      if (k === "down") {
        if (level === 1) {
          if (sort === list.length - 1) {
            return;
          }
          let next = sort + 1 < list.length ? sort + 1 : list.length - 1;
          const nextItem = list[next];
          const _label = nextItem._label;
          const _sort = nextItem.sort;
          list[next] = list[sort];
          list[sort] = nextItem;
          list[sort].sort = list[next].sort;
          list[next].sort = _sort;
          list[sort]._label = list[next]._label;
          list[next]._label = _label;
          setList([...list]);
          setCurrentItem(list[next]);
        }
        if (level === 2) {
        }
      }
    }
  };

  const handleItemSelected = (item: TreeListItem) => {
    let restList = resetTreeData(list);
    item._isSelected = true;
    setCurrentItem(item);
    setList([...restList]);
  };

  const handleItemExpanded = (item: TreeListItem) => {
    let restList = resetTreeData(list);
    item._isSelected = true;
    item._isExpanded = !!!item._isExpanded;
    setCurrentItem({ ...item });
    setList([...restList]);
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

/**
 * 创建树对象
 * @param dataSource
 * @returns
 */
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

interface resetTreeDataInterface {
  (dataSource: TreeListItem[]): TreeListItem[];
}

/**
 * 重置树对象
 * @param dataSource
 * @returns
 */
const resetTreeData: resetTreeDataInterface = (dataSource) => {
  const resetFn = (list: TreeListItem[]) => {
    for (let i = 0; i < list.length; i++) {
      const { subList, _isExpanded, _isSelected } = list[i];
      if (subList && subList.length > 0) {
        resetFn(subList);
      }
      if (_isSelected === true || _isExpanded === false) {
        list[i]._isExpanded = true;
        list[i]._isSelected = false;
        break;
      }
    }
  };
  resetFn(dataSource);
  return dataSource;
};

interface checkTreeDatainterface {
  (dataSource: TreeListItem[]): boolean;
}

/**
 * 校验树对象 是否有新增节点
 * @param dataSource
 * @returns {boolean} true 没有新增节点 false 有新增节点
 */
const checkTreeDataHasNew: checkTreeDatainterface = (dataSource) => {
  let flag = false;
  const checkFn = (list: TreeListItem[]) => {
    for (let i = 0; i < list.length; i++) {
      const { subList, id } = list[i];
      if (subList && subList.length > 0) {
        checkFn(subList);
      }
      if (id == undefined) {
        flag = true;
        break;
      }
    }
  };
  checkFn(dataSource);
  return flag;
};

export default OperationTree;
