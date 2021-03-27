import Dialog from './Dialog';
import classnames from 'classnames';
import Header from './Header';
import { IScript, IContent, IDialog, IRole, IRoleSet } from './types';
import { getRandomNum } from '@/utils/util';
import { useEffect, useState } from 'react';
import {
  CSSTransition,
  TransitionGroup,
} from 'react-transition-group';
import './Chat.less';

interface IPreview{
  className?: any
  style?: any;
  script: IScript;
  run: boolean;
}

function RenderContent({content, roles}:{content:IContent, roles:IRoleSet}){
  // 还没id则生成id
  if(!content.id) content.id = getRandomNum();
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  //if(!type) {
  const { text, from, id } = content as IDialog;
  const { name, side, isMain } = roles[from];
  //console.log(content.from, roles);
  return <Dialog key={id} name={name} side={side} text={text} isRight={isMain} />
}

function RenderContentList({contents, roles}:{contents:IContent[], roles:IRoleSet}){
  return (
    <TransitionGroup className="h-full w-full overflow-y-scroll">
      {
        contents.map(content=>{
          if(!content.id) content.id = getRandomNum();
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
    </TransitionGroup>
  );
}

export default function Preview({script, className, style, run}:IPreview){
  const { roles, contents, configs } = script;
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
          <RunPreview script={script} />
        </div>
      }
      <div className="absolute w-full h-12 bg-white" style={{bottom: "0"}}>
      </div>
    </div>
  );
}

function RunPreview({script}:{script:IScript}){
  const { contents, roles, configs } = script;
  const [nowContents, setNowContents] = useState<IContent[]>([]);
  const [index, setIndex] = useState(0);
  useEffect(()=>{
    //console.log('run step!');
    const content = contents[index];
    if(!content) return;
    const delay = content.delay || configs.defaultDelay;
    const id = setTimeout(()=>{
      nowContents.push(contents[index]);
      setIndex(index + 1);
    }, delay * 1000);
    return ()=>clearTimeout(id);
  }, [index]);
  return (
    <div className="w-full h-full">
      <RenderContentList roles={roles} contents={nowContents} />
    </div>
  );
}