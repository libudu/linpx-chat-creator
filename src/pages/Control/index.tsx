import React, { useState } from 'react';
import { useModel } from 'umi';
import { Button } from 'antd';
import { Tabs } from 'antd-mobile';
import classnames from 'classnames';

import { IRole } from '@/pages/types';

import ContentPage from './ContentPage';
import RolePage from './RolePage';
import ConfigPage from './ConfigPage';
import SelectSide from './components/SelectSide';
import ControlModal from './components/ControlModal';

import "./index.less";


interface IControl{
  className?: any;
  style?: any;
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

const Control: React.FC<IControl> = ({ className, style }) => {
  const { run, setRun } = useModel('app');
  const { setRole } = useModel('roles');

  const [ selectRole, setSelectRole ] = useState<IRole | null>(null);
  
  const onSelectSide = (src: string) => {
    if(selectRole) {
      setRole({
        ...selectRole,
        side: src,
      });
      setSelectRole(null);
    } else {
      console.error('[Control-index] select side error, no select role.');
    }
  };

  return (
    <div className={classnames(className, "bg-white relative")} style={style}>
      <Tabs tabs={tabs} initialPage={2}>
        <TabBox>
          <RolePage onClickSide={setSelectRole} />
        </TabBox>
        <TabBox>
          <ContentPage />
        </TabBox>
        <TabBox>
          <ConfigPage />
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
        selectRole && 
        <SelectSide onCancel={()=>setSelectRole(null)} onSelect={onSelectSide} />
      }
    </div>
  );
}

export default Control;