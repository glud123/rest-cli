import React, { useMemo, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { breadcrumbList } from "@/route/routes";
import "./index.less";

const OperationArea = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const breadcrumbCreater: any = useMemo(() => {
    let currentPath = location.pathname;
    let array: any[] = [];
    const ctreater: any = (obj: {
      parent: any;
      path: string;
      title: string;
    }) => {
      const { parent } = obj;
      array.push(obj);
      if (parent) {
        return ctreater(breadcrumbList[parent]);
      }
    };
    ctreater(breadcrumbList[currentPath]);
    array = array.reverse();
    array[0] = { ...array[0], path: `${array[0].path}/` };

    return array.map(({ path, title }) => {
      return (
        <Breadcrumb.Item>
          <Link to={path}>{title}</Link>
        </Breadcrumb.Item>
      );
    });
  }, [location.pathname]);

  return (
    <div className="operation-area-wrapper">
      <div className="oaw-container">
        <div className="oaw-left">
          {open ? (
            <MenuFoldOutlined
              onClick={() => {
                setOpen(false);
              }}
            />
          ) : (
            <MenuUnfoldOutlined
              onClick={() => {
                setOpen(true);
              }}
            />
          )}
          <Breadcrumb>{breadcrumbCreater}</Breadcrumb>
        </div>
        <div className="oaw-right">{}</div>
      </div>
    </div>
  );
};

export default OperationArea;
