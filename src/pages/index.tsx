import Control from './Control/index';
import Chat from '@/chat/Chat';
import defaultScript from './script';
import { useState } from 'react';
import { throttle } from 'lodash';

export default function IndexPage() {
  // 脚本数据
  const [script, setScript] = useState(defaultScript);
  // 最快每隔100ms才刷新一次界面
  const onScriptUpdate = throttle(()=>{
    setScript(Object.assign({}, script));
  }, 100, { 'leading': false });
  return (
    <div className="flex justify-center items-center h-screen overflow-scroll">
      <div className="flex flex-row h-screen py-10">
        <Control
          className="h-full"
          style={{width: '350px', border: '1px solid black', borderRadius: '5px'}}
          script={script}
          onScriptUpdate={onScriptUpdate}
        />
        <div
          className="h-full"
          style={{width: '350px', border: '1px solid black', borderRadius: '5px'}}
        >
          <Chat script={script} />
        </div>
      </div>
    </div>
  );
}
