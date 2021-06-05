import { useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import { IContent } from '../types';
import { useModel } from 'umi';
import Header from './components/Header';
import RenderContents from './RenderContents';

import './index.less';

interface IPreview {
  className?: any
  style?: any;
}

export default function Preview({ className, style }: IPreview) {
  const { run } = useModel('app');
  const { contents } = useModel('contents');
  const { roles, roleSet } = useModel('roles');
  const { configs } = useModel('configs');

  const { title, subTitle } = configs;
  
  const boxClassName = "h-full w-full bg-gray-100 pt-10 pb-12 flex flex-col overflow-y-scroll";

  return (
    <div className={classnames(className, 'h-full w-full relative')} style={style}>
      <Header title={title} subTitle={subTitle} />
      <div className={boxClassName}>
        <RenderContents roles={roleSet} contents={contents} />
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

function RunPreview() {
  const { contents } = useModel('contents');
  const { roleSet } = useModel('roles');
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
      <RenderContents roles={roleSet} contents={nowContents} bottomRef={bottomRef} />
    </div>
  );
}