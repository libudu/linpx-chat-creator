// 角色
export interface IRole {
  name: string;
  side: any;
  isMain?: boolean;
}

// 对话
export interface IDialog {
  from: string;
  text: string;
  showName?: boolean;
  id?: string | number; // 用于渲染时生成标记
}

export interface INotice {
  type: 'notice';
  text: string;
  id?: string | number; // 用于渲染时生成标记
}

export interface IPic {
  type: 'img';
  src: string;
  display: string;
  id?: string | number; // 用于渲染时生成标记
}


export type IContent = IDialog | INotice | IPic;

export type IRoleSet = { [id: string]: IRole};

// 脚本
export interface IScript {
  // 角色信息
  roles: IRoleSet;
  // 对话信息
  contents: IContent[];
  // 配置信息
  //configs: IChatConfig;
}

export interface IChatConfig {
  title: "橘猫的阅读器",
  subTitle: "114514人在线",
}
