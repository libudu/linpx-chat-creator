import { useModel } from 'umi';
import { IConfig } from '@/pages/types';
import { Input, InputNumber, Button } from 'antd';
import { useConfig } from '@/hooks/script';

interface InputEleProps {
  configKey: keyof IConfig;
  name: string;
}

const InputEle: React.FC<InputEleProps> = ({ configKey, name })=>{
  const { value, setValue} = useConfig(configKey);
  return (
    <Input
      className="mb-4"
      defaultValue={value}
      addonBefore={name}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

const InputNumberEle: React.FC<InputEleProps> = ({ configKey, name })=>{
  const { value, setValue} = useConfig(configKey);
  return (
    <div className="flex items-center">
      <span className="ml-2" style={{minWidth: '150px'}}>{name}：{value}</span>
      <InputNumber
        size={'small'}
        defaultValue={value}
        min={0} max={100} step={0.1} precision={2}
        onChange={(e) => setValue(e) }
      />
    </div>
  );
};

export default function ConfigPage(){
  const { setRun } = useModel('app');

  return (
    <div className="m-4">
      <InputEle configKey="title" name="主标题" />
      <InputEle configKey="subTitle" name="副标题" />
      <InputNumberEle configKey="defaultDelay" name="默认延迟时间" />
      
      <div className="flex justify-center my-8">
        <Button type="primary" onClick={() => setRun(true)}>开始运行</Button>
      </div>
    </div>
  );
}