import { useEffect, useRef, useState } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import classnames from 'classnames';
import { uid } from 'uid';
import { IContent, IDialog, IRoleSet } from '../types';
import { useModel } from 'umi';
import Dialog from './Dialog';
import Header from './Header';

import './index.less';

interface IPreview{
  className?: any
  style?: any;
}

function RenderContent({content, roles}:{content:IContent, roles:IRoleSet}){
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

function RenderContentList({contents, roles, bottomRef}:
  {contents:IContent[], roles:IRoleSet, bottomRef?:any})
{
  return (
    <TransitionGroup className="w-full">
        {
          contents.map(content=>{
            if(!content.id) content.id = uid();
            content = content as IDialog;
            const isRight = roles[content.from].isMain;
            return (<CSSTransition
              key={content.id}
              timeout={500}
              classNames={isRight ? 'item-right' : 'item'}
              children={<RenderContent content={content} roles={roles} />}
            />);
          })
        }
        <div className="h-0" ref={bottomRef}></div>
    </TransitionGroup>
  );
}

export default function Preview({ className, style }:IPreview) {
  const { run } = useModel('app');
  const { contents } = useModel('contents');
  const { roles } = useModel('roles');
  const { configs } = useModel('configs');
  const { title, subTitle } = configs;
  const boxClassName = "h-full w-full bg-gray-100 pt-10 pb-12 flex flex-col overflow-y-scroll";
  return (
    <div className={classnames(className, 'h-full w-full relative')} style={style}>
      <Header title={title} subTitle={subTitle} />
      <div className={boxClassName}>
        <RenderContentList roles={roles} contents={contents} />
      </div>
      {
        run && <div className={classnames(boxClassName, "absolute top-0")}>
          <RunPreview />
        </div>
      }
      <div className="absolute w-full h-12 bg-white" style={{bottom: "0"}}>
      </div>
    </div>
  );
}

function RunPreview(){
  const { contents } = useModel('contents');
  const { roles } = useModel('roles');
  const { configs } = useModel('configs');

  const [nowContents, setNowContents] = useState<IContent[]>([]);
  const [index, setIndex] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const content = contents[index];
    if(!content) return;
    const delay = content.delay || configs.defaultDelay;
    const id = setTimeout(()=>{
      nowContents.push(contents[index]);
      setIndex(index + 1);
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, delay * 1000);
    return ()=>clearTimeout(id);
  }, [index]);
  
  return (
    <div className="w-full h-full overflow-y-scroll">
      <RenderContentList roles={roles} contents={nowContents} bottomRef={bottomRef} />
    </div>
  );
}