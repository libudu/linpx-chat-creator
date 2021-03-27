import { IConfig } from '@/chat/types';
import { Input, InputNumber, Button } from 'antd';
import { delay } from 'lodash';

interface IConfigPage{
  configs: IConfig;
  onConfigUpdate: ()=>any;
}

export default function ConfigPage({ configs, onConfigUpdate }: IConfigPage){
  const { defaultDelay } = configs;
  const InputEle = (key:string, name:string)=>{
    // @ts-ignore
    const value = configs[key];
    return <Input
      className="mb-4"
      key={key}
      defaultValue={value}
      addonBefore={name}
      onChange={(e)=>{
        // @ts-ignore
        configs[key] = e.target.value;
        onConfigUpdate();
      }}
    />
  };
  return (
    <div className="m-4">
      {
        [
          ["title", "主标题"],
          ["subTitle", "副标题"],
        ].map(([key, value])=>InputEle(key, value))
      }
      <div className="flex items-center">
        <span className="ml-2" style={{minWidth: '150px'}}>默认延迟时间：{defaultDelay}</span>
        <InputNumber
          size={'small'}
          defaultValue={defaultDelay}
          min={0} max={100} step={0.1} precision={2}
          onChange={(e)=>{
            configs.defaultDelay = e;
            onConfigUpdate();
          }}
        />
      </div>
      
      <div className="flex justify-center my-8">
        <Button type="primary">开始运行</Button>
      </div>
    </div>
  );
}