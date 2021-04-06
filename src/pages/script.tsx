import { IScript } from './Chat/types';
import SideImg from '@/assets/test.jpg';

const Script:IScript = {
  roles: {
    1: {
      name: '她',
      side: SideImg,
    },
    2: {
      name: '你',
      side: SideImg,
      isMain: true,
    },
  },
  contents: [
    {
      from: '1',
      text: `学长你好，那个……在吗？`,
    },
    {
      from: '2',
      text: '啊，在的，有什么事吗',
    },
    {
      from: '1',
      text: '认识你很久了，有句话一直想对你讲',
    },
    {
      from: '1',
      text: '认识你很久了！请问可以和我开始交往吗！',
    },
    {
      from: '2',
      text: '哇！当然可以！太开心了！',
    },
    {
      from: '2',
      text: '不过我有个问题想问',
    },
    {
      from: '1',
      text: '啊？有什么问题吗……',
    },
    {
      from: '2',
      text: '这是Tim吗？为什么有些地方不太一样？',
    },
    {
      from: '1',
      text: '啊……这个……',
    },
    {
      from: '2',
      text: '怎么了？',
    },
    {
      from: '1',
      text: '这当然是因为……',
    },
    {
      from: '1',
      text: '这不是Tim啊，这是你写的一个程序而已',
    },
    {
      from: '2',
      text: '啊？原来是这样的吗……',
    },
    {
      from: '1',
      text: '当然是这样的啊，你这样早出晚归待在电脑面前还以为自己找得到女朋友吗',
    },
    {
      from: '1',
      text: '而且这个程序也一大堆东西没做完，还把自己搞感冒了',
    },
    {
      from: '2',
      text: '对不起……是我太菜了……',
    },
    {
      from: '1',
      text: '就你这样还想找女朋友？快醒醒别做梦了',
    },
    {
      from: '2',
      text: '55555',
    },
  ],
  configs: {
    title: "橘猫的阅读器",
    subTitle: "114514人在线",
    defaultDelay: 1,
  }
}

export default Script;