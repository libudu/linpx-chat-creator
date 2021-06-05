import { useState } from "react";
import { IConfig } from '@/pages/types';
import initScript from '../scripts';

export default function() {
  const [configs, setConfigs] = useState(initScript.configs);
  
  const setConfig = (key: keyof IConfig, value: IConfig[typeof key]) => {
    setConfigs({
      ...configs,
      [key]: value,
    });
  };

  return {
    configs,
    setConfig,
  };
}
