// 角色
export interface IRole {
  id: string;
  name: string;
  side: any;
  isMain?: boolean;
}

export interface IContentBase {
  id?: string; // 用于渲染时生成标记
  delay?: number;
}

// 对话
export interface IDialog extends IContentBase {
  from: string;
  text: string;
  showName?: boolean;
}

export interface INotice extends IContentBase {
  type: 'notice';
  text: string;
}

export interface IPic extends IContentBase {
  type: 'img';
  src: string;
  display: string;
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
  configs: IConfig;
}

export interface IConfig {
  title: string,
  subTitle: string,
  defaultDelay: number,
}
