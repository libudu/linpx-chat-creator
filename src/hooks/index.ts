import { useModel } from 'umi';
import { IConfig } from '@/pages/types';

type IConfigKey = keyof IConfig;
type IConfigValue = IConfig[keyof IConfig];
type ISetValue = (value: IConfigValue) => void;

const setValueSet: {
  [name in IConfigKey]?: ISetValue;
} = {};

export const useConfig = (key: IConfigKey) => {
  return useModel('configs', ({ configs, setConfig }) => {
    // 缓存设值函数，避免因每次生成不同函数而无法优化性能
    if(!setValueSet[key]) {
      setValueSet[key] = (value: IConfigValue) => setConfig(key, value);
    }
    return {
      value: configs[key] as any,
      setValue: setValueSet[key] as ISetValue,
    }
  });
};