import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { Button } from "antd";
import Store from "@/store";
import { Blocks, Block } from "@/components/BlockLayout";

const List = () => {
  let history = useHistory();

  const setOperation = useSetRecoilState(Store.platform.operationState);
  useEffect(() => {
    setOperation(
      <Button
        type="primary"
        onClick={() => {
          history.push("/curriculum-design/details");
        }}
      >
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
