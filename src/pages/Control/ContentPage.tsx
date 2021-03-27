import { IDialog, IContent, IScript, IRoleSet } from '@/pages/Chat/types';
import { Avatar, Input, Select } from 'antd';
import { Button } from 'antd-mobile';
import { DeleteOutlined } from '@ant-design/icons';
import { getRandomNum } from '@/utils/util';
import { onScriptUpdate } from '../index';

const { Option } = Select;
const { TextArea } = Input;

export default function ContentPage({script}:{script:IScript}){
  const { roles, contents } = script;
  // 所有对话的角色选项共用一个options
  const roleOptions = Object.entries(roles).map(([key, role])=>
    <Option value={key} key={key}>
      <div className="flex items-center text-base cdialog-rolebox">
        <div className="flex items-center">
          <Avatar className="flex-shrink-0" size={26} src={role.side}>{role.side}</Avatar>
        </div>
        <div className="ml-2 flex u-line-1" style={{maxWidth: "150px"}}>{role.name}</div>
      </div>
    </Option>
  );
  // 共用一个删除内容函数
  const onContentDelete = (content:IContent)=>{
    const index = contents.indexOf(content);
    if(index < 0) throw Error('要删除的对话不在对话列表中');
    contents.splice(index, 1);
    onScriptUpdate();
  };
  // 共用一个添加内容函数
  const onContentAdd = (index:number)=>{
    contents.splice(index, 0, {
      from: Object.keys(roles)[0],
      text: "默认对话",
    });
    onScriptUpdate();
  };
  return (
    <>
      {
        contents.map((content, index)=>{
          if(!content.id) content.id = getRandomNum();
          return (<div className="w-full" key={content.id}>
              {
                renderContent({
                  content,
                  roles,
                  roleOptions,
                  onContentAdd: ()=>onContentAdd(index),
                  onContentDelete: ()=>onContentDelete(content),
                })
              }
          </div>);
        })
      }
      <Button
        type="ghost"
        className="w-32 my-4"
        size="small"
        onClick={()=>onContentAdd(contents.length)}
      >
        新建对话
      </Button>
    </>
  );
}

interface IRenderContent{
  content:IContent;
  roles:IRoleSet;
  roleOptions:JSX.Element[];
  onContentAdd: ()=>void;
  onContentDelete:()=>void;
}


export function renderContent({content, roles, roleOptions, onContentAdd, onContentDelete}:IRenderContent){

  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  if(!type) {
    const dialog = content as IDialog;
    //console.log(content.from, roles);
    return (
      <CDialog
        roleOptions={roleOptions} dialog={dialog}
        onContentAdd={onContentAdd}
        onContentDelete={onContentDelete}
      />
    );
  }
  return null;
}

interface ICDialog{
  dialog: IDialog;
  roleOptions:JSX.Element[];
  onContentAdd: ()=>any;
  onContentDelete: ()=>any;
}

export function CDialog({dialog, roleOptions, onContentAdd, onContentDelete}:ICDialog){
  const { text, from } = dialog;
  return (
    <div className="px-4 w-full h-full">
      <div className="h-6 mt-1 flex flex-col justify-center items-center relative lp-content-add">
        <div className="bg-gray-300 w-full absolute" style={{height: '1px'}} />
        <div
          className="absolute w-5 h-5 flex items-center justify-between lp-content-add-icon z-20"
          onClick={onContentAdd}
        />
        <span className="mb-1 text-xl z-10">+</span>
      </div>
      <div className="flex items-center justify-between">
        <Select
          defaultValue={from}
          bordered={false}
          dropdownStyle={{width:'max-content'}}
          dropdownMatchSelectWidth={false}
          onSelect={(value)=>{
            dialog.from = value;
            onScriptUpdate();
          }}
          children={roleOptions}
        />
        <div
          className="text-lg mr-2 lp-delete-icon flex items-center justify-center p-1"
          onClick={onContentDelete}
        >
          <DeleteOutlined />
        </div>
      </div>
      <div className="my-1">
        <TextArea
          style={{wordBreak: 'break-all'}}
          defaultValue={text}
          autoSize={{ minRows: 1, maxRows: 3 }}
          onChange={(e)=>{
            dialog.text = e.target.value;
            onScriptUpdate();
          }}
        />
      </div>
    </div>
  );
}