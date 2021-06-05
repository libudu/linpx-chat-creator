import React, { useCallback, useState } from 'react';
import { useModel } from 'umi';
import { Tabs } from 'antd-mobile';
import classnames from 'classnames';

import { IRole } from '@/pages/types';

import ContentPage from './ContentPage';
import RolePage from './RolePage';
import ConfigPage from './ConfigPage';
import SelectSide from './components/SelectSideModal';
import RunningModal from './components/RunningModal';

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
  const { setRole } = useModel('roles', ({ setRole }) => ({ setRole }));

  const [ selectRole, setSelectRole ] = useState<IRole>();
  
  const onSelectSide = (src: string) => {
    if(selectRole) {
      setRole(selectRole, { side: src });
      setSelectRole(undefined);
    } else {
      console.error('[Control-index] select side error, no select role.');
    }
  };

  return (
    <div className={classnames(className, "bg-white relative")} style={style}>
      <Tabs tabs={tabs} initialPage={1}>
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
      <RunningModal />
      <SelectSide selectRole={selectRole} onCancel={() => setSelectRole(undefined)} onSelect={onSelectSide} />
    </div>
  );
}

export default Control;