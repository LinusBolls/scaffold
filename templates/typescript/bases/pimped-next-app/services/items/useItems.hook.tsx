import React, { Dispatch, useState } from "react";
import type { ItemType } from "../../types";

const newIdGenerator = () => {
  let id = 0;

  return () => {
    id += 1;
    return id;
  };
};
const newItemId = newIdGenerator();

interface UseItemsValue {
  items: { [key: string]: ItemType };
  setItems: Dispatch<{ [key: string]: ItemType }>;
  addItems: any;
}

function useItems(): UseItemsValue {
  const [test, setTest] = useState(false);

  const [items, setItems] = useState<{
    [key: string]: ItemType;
  }>({});

  const addItems = (
    parentId: string,
    items: Omit<ItemType, "id" | "parent" | "children">[]
  ) => {
    const newItems = items.reduce((prev, i) => {
      const id = newItemId();

      return {
        ...prev,
        [id]: { ...i, id, parent: parentId, children: [] },
      };
    }, {});

    setItems((prev) => ({ ...prev, ...newItems }));

    return newItems;
  };

  return { items, setItems, addItems };
}
export default useItems;
export type { UseItemsValue };
