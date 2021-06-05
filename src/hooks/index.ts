import { useModel } from 'umi';
import { IConfig } from '@/pages/types';

export const useConfig = (key: keyof IConfig) => {
  return useModel('configs', ({ configs, setConfig }) => ({
    value: configs[key] as any,
    setValue: (value: IConfig[keyof IConfig]) => setConfig(key, value),
  }));
};