import initScript from '../scripts';
import { IDialog } from '../pages/types';
import { dataStore, useArrayItem } from "./utils/useArrayItem";
import { uid } from 'uid';

export default function() {
  const { 
    items: contents,
    setItem: setContent,
    insertItem,
    deleteItem: deleteContent,
  } = useArrayItem(initScript.contents, 'contents');
  
  const insertDialog = (
    index: number,
    dialog: Omit<IDialog, 'id'> = 
      {
        from: dataStore['roles'][0].id,
        text: "默认对话",
      }
    ) => insertItem(index, { ...dialog, id: uid(6) }
  );

  return {
    contents,
    setContent,
    insertDialog,
    deleteContent,
  };
}