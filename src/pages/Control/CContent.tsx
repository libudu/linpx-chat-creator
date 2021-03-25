import { IDialog, IRole } from '@/chat/types';
import { Avatar, Input } from 'antd';

const { TextArea } = Input;

interface ICDialog{
  dialog: IDialog;
  roles: { [id: string]: IRole};
  onDialogChange: ()=>any;
}


export function CDialog({dialog, roles, onDialogChange}:ICDialog){
  const { text, from } = dialog;
  const role = roles[from];
  const { name, side } = role;
  return (
    <div className="px-4 py-2 w-full">
      <div className="flex items-center text-lg">
        <div className="mr-2"><Avatar size={28} src={side} /></div>
        <div>{name}</div>
      </div>
      <div className="my-2">
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