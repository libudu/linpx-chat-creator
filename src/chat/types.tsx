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
}

export interface INotice {
  type: 'notice';
  text: string;
}

export interface IPic {
  type: 'img';
  src: string;
  display: string;
}


export type IContent = IDialog | INotice | IPic;

// 脚本
export interface IScript {
  // 角色信息
  roles: { [id: string]: IRole};
  // 对话信息
  contents: IContent[];
  // 配置信息
  //configs: IChatConfig;
}

export interface IChatConfig {
  title: "橘猫的阅读器",
  subTitle: "114514人在线",
}
