import React, { useMemo, useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Breadcrumb } from "antd";
import Store from "@/store";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { breadcrumbList } from "@/route/routes";

const OperationArea = () => {
  const location = useLocation();
  const [operation, setOperation] = useRecoilState(
    Store.platform.operationState
  );
  const [menuOnOff, setMenuOnOff] = useRecoilState(Store.platform.menuOnOff);

  useEffect(() => {
    setOperation(null);
  }, [location.pathname]);

  const breadcrumbCreater: any = useMemo(() => {
    let currentPath = location.pathname;
    let array: any[] = [];
    const ctreater: any = (obj: {
      parent: any;
      path: string;
      title: string;
    }) => {
      if (obj) {
        const { parent } = obj;
        array.push(obj);
        if (parent) {
          return ctreater(breadcrumbList[parent]);
        }
      }
    };
    ctreater(breadcrumbList[currentPath]);
    if (array.length > 0) {
      array = array.reverse();

      return array.map(({ path, title }) => {
        return (
          <Breadcrumb.Item key={path}>
            <Link to={path}>{title}</Link>
          </Breadcrumb.Item>
        );
      });
    } else {
      return null;
    }
  }, [location.pathname]);

  return (
    <div className="operation-area-wrapper">
      <div className="oaw-container">
        <div className="oaw-left">
          {menuOnOff ? (
            <MenuFoldOutlined
              onClick={() => {
                setMenuOnOff(false);
              }}
            />
          ) : (
            <MenuUnfoldOutlined
              onClick={() => {
                setMenuOnOff(true);
              }}
            />
          )}
          <Breadcrumb>{breadcrumbCreater}</Breadcrumb>
        </div>
        <div className="oaw-right">{operation}</div>
      </div>
    </div>
  );
};

export default OperationArea;
