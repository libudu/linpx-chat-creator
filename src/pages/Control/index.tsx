import { Tabs } from 'antd-mobile';
import { Button, Avatar } from 'antd';
import classnames from 'classnames';
import { IScript } from '@/pages/Chat/types';

import ContentPage from './ContentPage';
import RolePage from './RolePage';
import ConfigPage from './ConfigPage';

import "./index.less";
import { useState } from 'react';

let defaultSides:any[] = [];
for(let i=1; i <= 12; i++){
  defaultSides.push(require(`@/assets/defaultSides/${i}.jpg`));
}

interface IControl{
  className?: any;
  style?: any;
  script: IScript;
  run: boolean;
  setRun: any;
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

export let showSelectSide:(callback:(src:any)=>any)=>any;
let selectSideCallback: (src:any)=>any;

export default function Preview({className, style, script, run, setRun}:IControl){
  const { roles, configs } = script;

  const [ selectSide, setSelectSide ] = useState(false);
  showSelectSide = (callback)=>{
    selectSideCallback = callback;
    setSelectSide(true);
    console.log(123);
  };

  return (
    <div className={classnames(className, "bg-white relative")} style={style}>
      <Tabs tabs={tabs}
        initialPage={2}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <TabBox>
          <RolePage roles={roles}  />
        </TabBox>
        <TabBox>
          <ContentPage script={script} />
        </TabBox>
        <TabBox>
          <ConfigPage configs={configs} />
        </TabBox>
      </Tabs>
      {
        run &&
        <div className="absolute w-full h-full z-50 bg-black bg-opacity-50 top-0 flex items-center justify-center">
          <Button className="w-32" type="primary" danger size="large" onClick={()=>setRun(false)}>
            结束运行
          </Button>
        </div>
      }
      {
        selectSide && <SelectSide hideSeletSide={()=>setSelectSide(false)} />
      }
    </div>
  );
}

function SelectSide({ hideSeletSide }: { hideSeletSide:()=>any }){
  return (
    <div
      className="w-full h-full absolute z-50 top-0 flex items-center justify-center"
      style={{backgroundColor: '#0004'}}
      onClick={hideSeletSide}
    >
      <div
        className="bg-white text-base pt-2 pb-4"
        style={{width: '90%'}}
        onClick={(e)=>e.stopPropagation()}
      >
        <div className="text-lg text-center">默认图片</div>
        <div className="flex items-center justify-center flex-wrap">
          {
            defaultSides.map((side, index)=>
              <div
                key={index}
                className="mx-1 my-0.5 lp-choose-side"
                onClick={()=>{
                  selectSideCallback(side);
                  hideSeletSide();
                }}
              >
                <Avatar size={40} src={side} />
              </div>
            )
          }
        </div>
        <div className="text-lg text-center">上传图片</div>
        <div className="flex justify-center">
          <Button onClick={hideSeletSide}>取消</Button>
          <Button type="primary">确定</Button>
        </div>
      </div>
    </div>
  );
}