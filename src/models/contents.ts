import initScript from '../scripts';
import { IDialog } from '../pages/types';
import { useArrayItem } from "./utils/useArrayItem";
import { uid } from 'uid';

export default function() {
  const { 
    items: contents,
    setItem: setContent,
    insertItem,
    deleteItem: deleteContent,
  } = useArrayItem(initScript.contents, 'contents');

  return {
    contents,
    setContent,
    insertDialog: (index: number, dialog: Omit<IDialog, 'id'>) => insertItem(index, { ...dialog, id: uid() }),
    deleteContent,
  };
}