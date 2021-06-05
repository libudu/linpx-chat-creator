import initScript from '../scripts';
import { IDialog } from '../pages/types';
import { dataStore, useArrayItem } from "./utils/useArrayItem";
import { uid } from 'uid';
import { useCallback } from 'react';
import { getConfig } from './configs';

export default function() {
  const { 
    items: contents,
    setItem: setContent,
    insertItem,
    deleteItem: deleteContent,
  } = useArrayItem(initScript.contents, 'contents');
  
  const insertDialog = useCallback((
    index: number,
    dialog: Omit<IDialog, 'id'> = 
      {
        from: dataStore['roles'][0].id,
        text: "默认对话",
        delay: getConfig('defaultDelay') as number,
      }
    ) => insertItem(index, { ...dialog, id: uid(6) }
  ), []);

  return {
    contents,
    setContent,
    insertDialog,
    deleteContent,
  };
}