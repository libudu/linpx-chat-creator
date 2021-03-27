import { IDialog, IContent, IScript, IRoleSet } from '@/chat/types';
import { Avatar, Input, Select } from 'antd';
import { Button } from 'antd-mobile';

const { Option } = Select;
const { TextArea } = Input;

export function ContentPage({script, onScriptUpdate}:{script:IScript, onScriptUpdate:any}){
  const { roles, contents } = script;
  // 所有对话的角色选项共用一个options
  const roleOptions = Object.entries(roles).map(([key, role])=>
    <Option value={key}>
      <div className="flex items-center text-base cdialog-rolebox">
        <div className="flex items-center">
          <Avatar className="flex-shrink-0" size={26} src={role.side}>{role.side}</Avatar>
        </div>
        <div className="ml-2 flex">{role.name}</div>
      </div>
    </Option>
  );
  return (
    <>
      {
        contents.map(content=>renderContent({
          content,
          roles,
          onContentUpdate:onScriptUpdate,
          roleOptions,
        }))
      }
      <Button
        type="ghost"
        className="w-32 mb-4"
        size="small"
        onClick={()=>{
          const defaultDialog:IDialog = {
            from: Object.keys(roles)[0],
            text: "默认对话",
          }
          contents.push(defaultDialog);
          onScriptUpdate();
        }}
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
  onContentUpdate:()=>void;
}
export function renderContent({content, roles, onContentUpdate, roleOptions}:IRenderContent){
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  if(!type) {
    const dialog = content as IDialog;
    //console.log(content.from, roles);
    return <CDialog roleOptions={roleOptions} roles={roles} dialog={dialog} onDialogChange={onContentUpdate} />
  }
  return null;
}

interface ICDialog{
  dialog: IDialog;
  roles: IRoleSet;
  roleOptions:JSX.Element[];
  onDialogChange: ()=>any;
}

export function CDialog({dialog, roles, onDialogChange, roleOptions}:ICDialog){
  const { text, from } = dialog;
  const role = roles[from];
  const { name, side } = role;
  return (
    <div className="px-4 py-2 w-full">
      <Select
        defaultValue={from}
        bordered={false}
        dropdownStyle={{width:'max-content'}}
        dropdownMatchSelectWidth={false}
        onSelect={(value)=>{
          dialog.from = value;
          onDialogChange();
        }}
      >
        {roleOptions}
      </Select>
      <div className="my-1">
        <TextArea
          style={{wordBreak: 'break-all'}}
          defaultValue={text}
          autoSize={{ minRows: 1, maxRows: 3 }}
          onChange={(e)=>{
            dialog.text = e.target.value;
            onDialogChange();
          }}
        />
      </div>
    </div>
  );
}