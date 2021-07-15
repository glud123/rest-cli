import React, { FC } from "react";
import "./index.css";

interface BlockInterface {
  width?: number | "auto";
  height?: number | "auto";
  row: number;
  cell?: number;
  start?: number;
  end?: number;
  backgroundColor?: string;
  border?: boolean;
  title?: string | React.ReactNode;
}

/**
 * 单块 容器
 * @param {number} row 项目所在行 必填
 * @param {number} cell 项目所占单元格数量
 * @param {number | string} width 项目宽 默认 auto
 * @param {number | string} height 项目高 默认 auto
 * @param {string | node} title 标题
 * @param {boolean} border 项目边框
 * @param {string} backgroundColor 项目背景色
 */

export const Block: FC<BlockInterface> = (props) => {
  const {
    children,
    width,
    height,
    start,
    end,
    backgroundColor,
    border = true,
    title,
  } = props;
  const styles = {
    width,
    height,
    gridColumn: `${start} / ${end}`,
    overflow: "hidden",
  };
  return (
    <div className="block-item" style={styles}>
      <div
        style={{ backgroundColor }}
        className={`block-wrapper ${border ? "block-wrapper-border" : ""}`}
      >
        {title && <div className="block-item-title">{title}</div>}
        <div className="block-item-inner">{children}</div>
      </div>
    </div>
  );
};
Block.displayName = "Block";

interface BlocksInterface {
  row?: number;
  col?: number;
  width?: number | string;
  height?: number | string;
  lineWidth?: number;
  backgroundColor?: { blocks: string; block: string };
}

/**
 * 多块 容器
 * @param {number} row 容器内部行数 默认 1
 * @param {number} col 容器内部列数 默认 1
 * @param {number | string} width 容器宽 默认 100%
 * @param {number | string} height 容器高 默认 100%
 * @param {number} lineWidth 容器内部间隔线宽度 默认 16px
 * @param {object} backgroundColor blocks 容器背景色 block 项目背景色
 */

export const Blocks: FC<BlocksInterface> = (props) => {
  const {
    children,
    row = 1,
    col = 1,
    width = "100%",
    height = "100%",
    lineWidth = 16,
    backgroundColor = { blocks: "transparent", block: "#FFFFFF" },
  } = props;

  const gridTemplate = getGridTemplate(children, row, col);

  const styles = {
    width,
    height,
    gridTemplateColumns: gridTemplate.gridTemplateColumns,
    gridTemplateRows: gridTemplate.gridTemplateRows,
    gridGap: `${lineWidth - 8}px`,
    backgroundColor: backgroundColor.blocks,
  };

  return (
    <div className="blocks-container" style={styles}>
      {React.Children.map(children, (child: any, i) => {
        return React.cloneElement(child, {
          start: gridTemplate.gridItems[i].start,
          end: gridTemplate.gridItems[i].end,
          backgroundColor: child.props.backgroundColor || backgroundColor.block,
        });
      })}
    </div>
  );
};
Blocks.displayName = "Blocks";

interface getGridTemplateInterface {
  (children: any, row: number, col: number): {
    gridTemplateRows: string;
    gridTemplateColumns: string;
    gridItems: {
      // k 项目在容器中的位置
      [k: string]: {
        // 项目的宽
        width: number | string;
        // 项目的高
        height: number | string;
        // 项目开始位置
        start: number;
        // 项目结束位置
        end: number;
        // 所在行下标
        rowIndex: number;
        // 所在列下标
        colIndex: number;
      };
    };
  };
}

const getGridTemplate: getGridTemplateInterface = (children, row, col) => {
  // 容器中项目信息
  let gridItems: {
    // k 项目在容器中的位置
    [k: string]: {
      // 项目的宽
      width: number | string;
      // 项目的高
      height: number | string;
      // 项目开始位置
      start: number;
      // 项目结束位置
      end: number;
      // 所在行下标
      rowIndex: number;
      // 所在列下标
      colIndex: number;
    };
  } = {};
  // 容器内 行集合
  let rows: { width: any; height: any; start: number; end: any }[][] = [];
  // 容器内容 行列的二维数组
  for (let i = 0; i < row; i++) {
    rows.push(new Array(col));
  }
  // 行集合下标
  let rowIndex = 0;
  // 列集合下标
  let colIndex = 0;
  // 每一行的最大高度 即行高集合
  let maxRows: any[] = [];
  for (let i = 0; i < row; i++) {
    maxRows.push(new Array(col).fill(undefined));
  }
  // 每一列的最大宽度 即列宽集合
  let maxCols: any[] = [];
  for (let i = 0; i < col; i++) {
    maxCols.push(new Array(row).fill(undefined));
  }
  // 每一列遍历时当前项的前一项
  let preItem: {
    index: number;
    cell: any;
    end: any;
    width?: any;
    height?: any;
    start?: number;
  };

  React.Children.forEach(children, (child: any, index: number) => {
    if (child && child.type && child.type.displayName === "Block") {
      const { row: itemRow, height, width, cell } = child.props;
      // 当前项 所在行如果大于 容器所设置的行 报警告
      if (itemRow > row) {
        throw new Error(
          `报错元素所在容器中位置 >> 第 ${
            index + 1
          } 个 <Block> 元素。\n<Blocks> 容器设置行数：${row}, 当前项所在行：${itemRow}。已经超出容器行数范围，注意调整！！！`
        );
      }

      // 行下标
      rowIndex = itemRow - 1;
      // 每行首个项目
      let item = {
        // 项目元素所在容器下标
        index,
        cell,
        width,
        height,
        start: 1,
        end: 1 + (cell ? cell : col),
      };

      if (!rows[rowIndex][0]) {
        colIndex = 0;
      } else {
        if (!preItem.cell) {
          throw new Error(
            `报错项目元素所在容器中位置 >> 第 ${
              preItem.index + 1
            } 个 <Block> 元素，需要添加 cell 属性，为计算当前行后续元素位置。`
          );
        }
        // 当前项的列集合下标是 前一项列集合下标加上前一项所占单元格数量
        colIndex = colIndex + preItem.cell;
        item.start = preItem.end;
        item.end = preItem.end + (cell ? cell : col - preItem.cell);
      }
      // 记录前一项
      preItem = item;

      if (item.end > col + 1) {
        throw new Error(
          `报错项目元素所在容器中位置 >> 第 ${
            index + 1
          } 个 <Block> 元素。\n<Blocks> 容器设置列数：${col}, 当前项所在列：${
            item.end - 1
          }。已经超出容器列数范围，注意调整！！！`
        );
      }

      maxRows[rowIndex][colIndex] = height;
      maxCols[colIndex][rowIndex] = width;

      // 将项目添加到 行列集合中（添加单元格对象）
      rows[rowIndex][colIndex] = item;
      gridItems[index] = {
        rowIndex: rowIndex + 1,
        colIndex: colIndex + 1,
        ...item,
      };
    }
  });

  maxRows = maxRows.map((rows, i) => {
    let rowHeight = rows.reduce((h1: number, h2: number) => {
      if (!h1 && !h2) {
        return undefined;
      }
      if (h1 && h2) {
        return h1 > h2 ? h1 : h2;
      }
      return h1 || h2;
    });
    if (rowHeight && rowHeight !== "auto") {
      return `${rowHeight}px`;
    } else {
      if (i === row - 1) {
        return "1fr";
      }
    }
    return "auto";
  });

  maxCols = maxCols.map((cols) => {
    let colWidth = cols.reduce((w1: number, w2: number) => {
      if (!w1 && !w2) {
        return undefined;
      }
      if (w1 && w2) {
        return w1 > w2 ? w1 : w2;
      }
      return w1 || w2;
    });

    return colWidth && colWidth !== "auto" ? `${colWidth}px` : "1fr";
  });

  return {
    gridTemplateRows: maxRows.join(" "),
    gridTemplateColumns: maxCols.join(" "),
    gridItems,
  };
};
