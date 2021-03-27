import { IScript } from './Chat/types';
import SideImg from '@/assets/test.jpg';

const Script:IScript = {
  roles: {
    1: {
      name: '小明',
      side: SideImg,
    },
    2: {
      name: '小红',
      side: SideImg,
      isMain: true,
    },
  },
  contents: [
    {
      from: '1',
      text: `你好`,
    },
    {
      from: '2',
      text: '我不好',
    },
    {
      from: '1',
      text: '你很好',
    },
    {
      from: '1',
      text: '很好',
    },
  ],
  configs: {
    title: "橘猫的阅读器",
    subTitle: "114514人在线",
    defaultDelay: 1,
  }
}

export default Script;