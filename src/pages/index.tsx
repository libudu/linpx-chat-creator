import Control from './Control';
import Chat from '@/chat/Chat';
import defaultScript from './script';
import { useState } from 'react';
import { throttle } from 'lodash';

export default function IndexPage() {
  const [script, setScript] = useState(defaultScript);
  return (
    <div className="flex justify-center items-center h-screen overflow-scroll">
      <div className="flex flex-row h-screen py-10">
        <Control
          className="h-full"
          style={{width: '350px', border: '1px solid black', borderRadius: '5px'}}
          script={script}
          onScriptUpdate={()=>setScript(Object.assign({}, script))}
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
