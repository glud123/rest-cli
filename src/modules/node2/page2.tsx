import React from "react";
import { Blocks, Block } from "@/components/BlockLayout";

const Node = () => {
  return (
    <Blocks row={2} col={3}>
      <Block row={1} cell={1}></Block>
      <Block row={1} cell={1}></Block>
      <Block row={1} cell={1}></Block>
      <Block row={2} cell={1}></Block>
      <Block row={2} cell={1}></Block>
      <Block row={2} cell={1}></Block>
    </Blocks>
  );
};

export default Node;
