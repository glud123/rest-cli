import React, { FC } from "react";
import { Menu as AntdMenu } from "antd";
import { menuList } from "@/route/routes";
import "./index.less";

const { SubMenu, ItemGroup, Item: MenuItem } = AntdMenu;

const Menu: FC<any> = (props) => {
  const children = props.children;
  const createMenu = (options: any[]) => {
    return options.map((item, index) => {
      if (item.children) {
        return (
          <SubMenu key={item.name} title={item.title}>
            {createMenu(item.children)}
          </SubMenu>
        );
      } else {
        return <MenuItem key={item.name}>{item.title}</MenuItem>;
      }
    });
  };
  return (
    <div className="menu-wrapper">
      <AntdMenu
        mode="inline"
        onClick={(e) => {
          console.log(e);
        }}
      >
        {createMenu(menuList)}
      </AntdMenu>
    </div>
  );
};

export default Menu;
