import { useCallback, useState } from "react";
import { IConfig } from '@/pages/types';
import initScript from '../scripts';

let _configs: IConfig;
export default function() {
  const [configs, setConfigs] = useState(initScript.configs);
  _configs = configs;
  
  const setConfig = useCallback((key: keyof IConfig, value: IConfig[typeof key]) => {
    // 每次都获取到最新的configs
    const configs = _configs;

    setConfigs({
      ...configs,
      [key]: value,
    });
  }, []);

  return {
    configs,
    setConfig,
  };
}

export const getConfig = (key: keyof IConfig) => {
  return _configs[key];
}