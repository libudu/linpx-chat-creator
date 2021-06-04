import { useState, useCallback } from "react";
import { IContent } from '@/pages/types';
import initScript from '../scripts';

export default function() {
  const [contents, setContents] = useState(initScript.contents);

  const setContent = useCallback((content: IContent) => {
    const index = contents.indexOf(content);
    if(index < 0) {
      console.error('[model-script-content-set] the content does not exist.', content, contents);
    } else {
      contents.splice(index, 1, content);
      setContents([...contents]);
    }
  }, []);

  const deleteContent = useCallback((content: IContent) => {
    const index = contents.indexOf(content);
    if(index < 0) {
      console.error('[model-script-content-delete] the content does not exist.', content, contents);
    } else {
      contents.splice(index, 1);
      setContents([...contents]);
    }
  }, []);

  const insertContent = useCallback((index: number, content: IContent) => {
    contents.splice(index, 0, content);
    setContents([...contents]);
  }, []);

  return {
    contents,
    setContent,
    insertContent,
    deleteContent,
  };
}