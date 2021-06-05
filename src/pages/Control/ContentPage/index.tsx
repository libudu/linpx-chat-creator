import { useModel } from 'umi';
import { Button } from 'antd-mobile';

import { IDialog, IContent } from '@/pages/types';

import Dialog from './components/Dialog';
import InsertContent from './components/InsertContent';

export default function ContentPage(){
  const {
    contents,
    insertDialog,
  } = useModel('contents');

  return (
    <div className="px-4 w-full h-full">
      {
        contents.map((content, index) => (<>
          <InsertContent key={`i-${index}`} index={index} newContent={insertDialog} />
          <Content
            key={`c-${content.id}`}
            content={content}
          />
        </>))
      }
      <Button
        type="ghost"
        className="w-32 my-4"
        size="small"
        onClick={() => insertDialog(contents.length)}
      >
        新建对话
      </Button>
    </div>
  );
}

interface IRenderContent {
  content: IContent;
}

export function Content({ content }: IRenderContent) {
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  if(!type) {
    const dialog = content as IDialog;
    return <Dialog dialog={dialog} />;
  }
  return null;
}
