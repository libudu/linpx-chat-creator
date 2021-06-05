import { IMap, PieceOf } from "@/pages/types";
import { useState, useMemo, useCallback } from "react";
import { throttle } from "lodash"

export const dataStore: { [name: string]: any } = {};

// 遵循数据不断原则，每次更新都是一个新的对象
// 但是每次返回的函数都是一样的，数据从dataStore中取
export const useArrayItem = <T extends { id: string }>(initState: T[], name: string) => {
  const [_items, setItems] = useState(initState);
  dataStore[name] = _items;

  const itemSet = useMemo(() => {
    const itemSet: IMap<T> = {};
    initState.forEach(item => {
      itemSet[item.id] = item;
    });
    return itemSet;
  }, []);

  // 设置Item可以拓展子类型
  const setItem = useCallback(
    throttle(<S extends T>(item: S, newContent: PieceOf<S>) => {
      const items = dataStore[name];

      const index = items.indexOf(item);
      if(index < 0) {
        console.error(`[model-${name}-setItemError] the item does not exist.`, item, items);
      } else {
        const newItem = { ...item, ...newContent };
        setItems([...items.slice(0, index), newItem, ...items.slice(index + 1)]);
        itemSet[newItem.id] = newItem;
      }
    }, 200)
  , []);

  const deleteItem = useCallback((item: T) => {
    const items = dataStore[name];
    
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
    const items = dataStore[name];
    
    setItems([...items.slice(0, index), item, ...items.slice(index)]);
    itemSet[item.id] = item;
  }, []);

  return {
    items: _items,
    itemSet,
    setItem,
    insertItem,
    deleteItem,
  };
}