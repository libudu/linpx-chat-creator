import Control from './Control/index';
import Chat from '@/pages/Chat/Chat';
import defaultScript from './script';
import { useState } from 'react';
import { throttle } from 'lodash';

let _setScript:any;
export let onScriptUpdate = throttle(()=>_setScript(), 200);

export default function IndexPage() {
  // 脚本数据
  const [script, setScript] = useState(defaultScript);
  
  _setScript = () => setScript(Object.assign({}, script));

  return (
    <div className="flex justify-center items-center h-screen overflow-scroll">
      <div className="flex flex-row h-screen py-10">
        <Control
          className="h-full"
          style={{width: '350px', border: '1px solid black', borderRadius: '5px'}}
          script={script}
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
