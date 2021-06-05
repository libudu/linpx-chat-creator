import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import { uid } from 'uid';
import { IContent, IDialog, IRoleSet } from '../types';
import Dialog from './Dialog';

function RenderContent({ content, roles }: { content:IContent, roles:IRoleSet}){
  // 还没id则生成id
  if(!content.id) content.id = uid();
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  //if(!type) {
  const { text, from, id } = content as IDialog;
  const { name, side, isMain } = roles[from];
  //console.log(content.from, roles);
  return <Dialog key={id} name={name} side={side} text={text} isRight={isMain} />
}

interface IRenderContentsProps {
  contents:IContent[];
  roles:IRoleSet;
  bottomRef?:any;
}

export default function RenderContents({contents, roles, bottomRef}: IRenderContentsProps) {
  return (
    <TransitionGroup className="w-full">
      {
        contents.map(content=>{
          if(!content.id) content.id = uid();
          content = content as IDialog;
          const isRight = roles[content.from].isMain;
          return (
            <CSSTransition
              key={content.id}
              timeout={500}
              classNames={isRight ? 'item-right' : 'item'}
            >
              <RenderContent content={content} roles={roles} />
            </CSSTransition>
          );
        })
      }
      <div className="h-0" ref={bottomRef}></div>
    </TransitionGroup>
  );
}