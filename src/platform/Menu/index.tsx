import React, { FC, useMemo } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Menu as AntdMenu } from "antd";
import { menuList } from "@/route/routes";
import "./index.less";

const { SubMenu, ItemGroup, Item: MenuItem } = AntdMenu;

const Menu: FC<any> = () => {
  let history = useHistory();
  const location = useLocation();

  const defaultOpenKeys = useMemo(() => {
    let subMenuKey = location.pathname.split("/");
    subMenuKey = subMenuKey.slice(1, subMenuKey.length - 1);

    subMenuKey = subMenuKey.map((key, i) => {
      const before = subMenuKey[i - 1];
      if (before) {
        return `/${before}/${key}`;
      } else {
        return `/${key}`;
      }
    });
    return subMenuKey;
  }, []);

  const defaultSelectedKeys = useMemo(() => {
    let redirectItem: any = null;
    const findRedirectItemFn: any = (list: any[]) => {
      return list.forEach((item) => {
        if (item.children && item.children.length > 0) {
          return findRedirectItemFn(item.children);
        }
        if (item.redirect === location.pathname) {
          redirectItem = item;
        }
      });
    };

    findRedirectItemFn(menuList);
    if (redirectItem) {
      return [redirectItem.path];
    }
    return [location.pathname];
  }, []);

  const createMenu = (options: any[]) => {
    return options.map((item, index) => {
      if (item.children) {
        return (
          <SubMenu key={item.name} title={item.title}>
            {createMenu(item.children)}
          </SubMenu>
        );
      } else {
        return (
          <MenuItem
            key={item.name}
            title={item.title}
            attribute={{ redirect: item.redirect }}
          >
            {item.title}
          </MenuItem>
        );
      }
    });
  };

  return (
    <div className="menu-wrapper">
      <AntdMenu
        mode="inline"
        defaultSelectedKeys={defaultSelectedKeys}
        defaultOpenKeys={defaultOpenKeys}
        onClick={(e) => {
          const { key, keyPath, item }: any = e;
          console.log(e);
          if (item.props.attribute && item.props.attribute.redirect) {
            history.push(item.props.attribute.redirect as string);
          } else {
            history.push(key as string);
          }
        }}
      >
        {createMenu(menuList)}
      </AntdMenu>
    </div>
  );
};

export default Menu;
