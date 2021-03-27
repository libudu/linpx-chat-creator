import { Tabs } from 'antd-mobile';
import classnames from 'classnames';
import { IScript } from '@/chat/types';

import ContentPage from './ContentPage';
import RolePage from './RolePage';
import ConfigPage from './ConfigPage';

import "./index.less";

interface IControl{
  className?: any;
  style?: any;
  script: IScript;
  onScriptUpdate: ()=>any;
}

function TabBox({children}:{children:any}){
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: 'max-content'}}
    >
      {children}
    </div>
  );
}

const tabs = [
  { title: '角色', sub: '1' },
  { title: '对话', sub: '2' },
  { title: '配置与调试', sub: '3' },
];

export default function Preview({className, style, script, onScriptUpdate}:IControl){
  const { roles, configs } = script;
  return (
    <div className={classnames(className, "bg-white")} style={style}>
      <Tabs tabs={tabs}
        initialPage={1}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <TabBox>
          <RolePage roles={roles} onScriptUpdate={onScriptUpdate}  />
        </TabBox>
        <TabBox>
          <ContentPage script={script} onScriptUpdate={onScriptUpdate} />
        </TabBox>
        <TabBox>
          <ConfigPage configs={configs} onConfigUpdate={onScriptUpdate} />
        </TabBox>
      </Tabs>
    </div>
  );
}