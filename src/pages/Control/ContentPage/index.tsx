import { useModel } from 'umi';
import { Button } from 'antd-mobile';

import { IDialog, IContent } from '@/pages/types';

import Dialog from './components/Dialog';

export default function ContentPage(){
  const { contents, insertDialog } = useModel('contents');

  return (
    <>
      {
        contents.map((content, index)=>{
          const id = content.id;
          return <Content key={id} index={index} content={content} />;
        })
      }
      <Button
        type="ghost"
        className="w-32 my-4"
        size="small"
        onClick={() => insertDialog(contents.length)}
      >
        新建对话
      </Button>
    </>
  );
}

interface IRenderContent{
  index: number;
  content:IContent;
}

export function Content({ index, content }:IRenderContent){
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  if(!type) {
    const dialog = content as IDialog;
    return (
      <Dialog
        index={index}
        dialog={dialog}
      />
    );
  }
  return null;
}
