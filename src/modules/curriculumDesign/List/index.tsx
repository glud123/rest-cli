import React, { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Button } from "antd";
import Store from "@/store";
import { Blocks, Block } from "@/components/BlockLayout";

const List = () => {
  const setTodoList = useSetRecoilState(Store.platform.operationState);
  useEffect(() => {
    setTodoList(
      <Button type="primary" onClick={() => {}}>
        课程设计
      </Button>
    );
  }, []);
  return (
    <Blocks row={2}>
      <Block row={1}></Block>
      <Block row={2}></Block>
    </Blocks>
  );
};

export default List;
