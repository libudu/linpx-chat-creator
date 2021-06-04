import { useModel } from 'umi';
import { Button } from 'antd-mobile';
import { uid } from 'uid';

import { IDialog, IContent, IRoleSet } from '@/pages/types';

import Dialog from './components/Dialog';


export default function ContentPage(){
  const { contents, insertContent } = useModel('contents');
  const { roles } = useModel('roles');

  // 共用一个添加内容函数
  const onContentAdd = (index:number)=>{
    insertContent(index, {
      from: Object.keys(roles)[0],
      text: "默认对话",
    });
  };

  return (
    <>
      {
        contents.map((content, index)=>{
          if(!content.id) content.id = uid();
          return (<div className="w-full" key={content.id}>
              {
                renderContent({
                  index,
                  content,
                  roles,
                })
              }
          </div>);
        })
      }
      <Button
        type="ghost"
        className="w-32 my-4"
        size="small"
        onClick={()=>onContentAdd(contents.length)}
      >
        新建对话
      </Button>
    </>
  );
}

interface IRenderContent{
  index: number;
  content:IContent;
  roles:IRoleSet;
}

export function renderContent({ index, content }:IRenderContent){
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
