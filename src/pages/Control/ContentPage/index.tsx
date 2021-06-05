import { useModel } from 'umi';
import { memo } from 'react';
import { Button } from 'antd-mobile';

import { IDialog, IContent } from '@/pages/types';

import Dialog from './components/Dialog';
import InsertContent from './components/InsertContent';

const ContentPage: React.FC = () => {
  const {
    contents,
    insertDialog,
  } = useModel('contents');

  return (
    <div className="px-4 w-full h-full">
      {
        contents.map((content, index) => (<>
          <InsertContent key={`i-${index}`} index={index} newContent={insertDialog} />
          <RenderContent key={`c-${content.id}`} content={content} />
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

export default memo(ContentPage);

interface IRenderContent {
  content: IContent;
}

export const RenderContent: React.FC<IRenderContent> = memo(({ content }) => {
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  if(!type) {
    return <Dialog dialog={content as IDialog} />;
  }
  return null;
})
