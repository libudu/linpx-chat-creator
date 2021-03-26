import { IDialog, IRole, IContent, IScript, IRoleSet } from '@/chat/types';
import { Avatar, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export function ContentPage({script, onScriptUpdate}:{script:IScript, onScriptUpdate:any}){
  const { roles, contents } = script;
  // 所有对话的角色选项共用一个options
  const roleOptions = Object.entries(roles).map(([key, role])=>
    <Option className="w-30" value={key}>
      <div className="flex items-center text-base cdialog-rolebox">
        <div className="flex items-center">
          <Avatar className="flex-shrink-0" size={26} src={role.side}>{role.side}</Avatar>
        </div>
        <div className="ml-2 overflow-ellipsis flex">{role.name}</div>
      </div>
    </Option>
  );
  return (
    <div className="w-full">
      {
        contents.map(content=>renderContent({
          content,
          roles,
          onContentUpdate:onScriptUpdate,
          roleOptions,
        }))
      }
    </div>
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