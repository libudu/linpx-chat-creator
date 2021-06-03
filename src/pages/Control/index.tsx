import { Tabs } from 'antd-mobile';
import { Button } from 'antd';
import classnames from 'classnames';
import { IScript, IRole } from '@/pages/types';

import ContentPage from './ContentPage';
import RolePage from './RolePage';
import ConfigPage from './ConfigPage';
import SelectSide from './components/SelectSide';

import "./index.less";
import React, { useState } from 'react';
import { onScriptUpdate } from '..';
import ControlModal from './components/ControlModal';


interface IControl{
  className?: any;
  style?: any;
  script: IScript;
  run: boolean;
  setRun: any;
}

function TabBox({children}: { children:any }) {
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

let selectRole: IRole;

const Control: React.FC<IControl> = ({ className, style, script, run, setRun }) => {
  const { roles, configs } = script;

  const [ selectSide, setSelectSide ] = useState(false);
  
  const onSelectSide = (src:any) => {
    selectRole.side = src;
    setSelectSide(false);
    onScriptUpdate();
  };

  const onClickSide = (role:IRole) => {
    setSelectSide(true);
    selectRole = role;
  };

  return (
    <div className={classnames(className, "bg-white relative")} style={style}>
      <Tabs tabs={tabs} initialPage={2}>
        <TabBox>
          <RolePage roles={roles} onClickSide={onClickSide} />
        </TabBox>
        <TabBox>
          <ContentPage script={script} />
        </TabBox>
        <TabBox>
          <ConfigPage configs={configs} />
        </TabBox>
      </Tabs>
      <ControlModal />
      {
        run &&
        <div className="absolute w-full h-full z-50 bg-black bg-opacity-50 top-0 flex items-center justify-center">
          <Button className="w-32" type="primary" danger size="large" onClick={()=>setRun(false)}>
            结束运行
          </Button>
        </div>
      }
      {
        selectSide && <SelectSide onCancel={()=>setSelectSide(false)} onSelect={onSelectSide} />
      }
    </div>
  );
}

export default Control;