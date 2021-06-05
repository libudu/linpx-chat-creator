import { IMap } from "@/pages/types";
import { useState, useCallback, useMemo } from "react";
import { useCallbackThrottle } from "./util";

type PieceOf<T> = { [P in keyof T]?: T[P] } 

// 遵循对象不可变原则
export const useArrayItem = <T extends { id: string }>(initState: T[], name: string) => {
  const [items, setItems] = useState(initState);

  const itemSet = useMemo(() => {
    const itemSet: IMap<T> = {};
    initState.forEach(item => {
      itemSet[item.id] = item;
    });
    return itemSet;
  }, []);

  // 设置Item可以拓展子类型
  const setItem = useCallbackThrottle(<S extends T>(item: S, newContent: PieceOf<S>) => {
    const index = items.indexOf(item);
    if(index < 0) {
      console.error(`[model-${name}-setItemError] the item does not exist.`, item, items);
    } else {
      const newItem = { ...item, ...newContent };
      setItems([...items.slice(0, index), newItem, ...items.slice(index+1)]);
      itemSet[newItem.id] = newItem;
    }
  });

  const deleteItem = useCallback((item: T) => {
    const index = items.indexOf(item);
    if(index < 0) {
      console.error(`[model-${name}-deleteItemError] the item does not exist.`, item, items);
    } else {
      items.splice(index, 1);
      setItems([...items]);
      itemSet[item.id] = item;
    }
  }, []);

  const insertItem = useCallback((index: number, item: T) => {
    setItems([...items.slice(0, index), item, ...items.slice(index+1)]);
    itemSet[item.id] = item;
  }, []);

  return {
    items,
    itemSet,
    setItem,
    insertItem,
    deleteItem,
  };
}