import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Button, Table } from "antd";
import Store from "@/store";
import { Blocks, Block } from "@/components/BlockLayout";
import Filter from "@/components/Filter";
import { columns } from "./columnsOptions";

const List = () => {
  let history = useHistory();

  const setOperation = useSetRecoilState(Store.platform.operationState);
  useEffect(() => {
    setOperation(
      <Button
        type="primary"
        onClick={() => {
          // history.push("/curriculum-design/details");
        }}
      >
        新增
      </Button>
    );
  }, []);

  const data = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sidney No. 1 Lake Park",
      tags: ["cool", "teacher"],
    },
  ];

  return (
    <Blocks row={2}>
      <Block row={1}>
        <Filter />
      </Block>
      <Block row={2}>
        <Table columns={columns} dataSource={data} />
      </Block>
    </Blocks>
  );
};

export default List;
