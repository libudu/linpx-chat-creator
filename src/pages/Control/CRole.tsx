import { Input, Avatar, Switch } from 'antd';
import { IRole } from '@/chat/types';

interface IControlRole{
  role: IRole;
  onRoleChange: ()=>any;
}

export default function CRole({role, onRoleChange}:IControlRole){
  const { side, name, isMain } = role;
  return (
    <div className="flex my-4 text-lg">
      <div className="mr-4" >
        <Avatar size={60} src={side} gap={5} >{side}</Avatar>
      </div>
      <div className="h-8">
        <Input
          maxLength={40}
          defaultValue={name}
          onChange={(e)=>{
            const newName = e.target.value
            if(newName !== name) {
              role.name = newName;
              onRoleChange();
            }
          }}
        />
        <div className="flex items-center h-10">
          <div className="mr-4">靠右</div>
          <div>
            <Switch
              defaultChecked={isMain}
              onChange={()=>{
                role.isMain = !isMain;
                onRoleChange();
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}