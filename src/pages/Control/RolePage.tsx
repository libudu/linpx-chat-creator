import { Input, Avatar, Switch } from 'antd';
import { IRole } from '@/chat/types';
import { Button } from 'antd-mobile';
import { IRoleSet } from '@/chat/types';

interface IRolePage{
  roles: IRoleSet;
  onScriptUpdate: ()=>{};
}

export default function RolePage({ roles, onScriptUpdate }:IRolePage) {
  return (
    <>
      {
        Object.entries(roles).map(([id, role])=>
          <CRole
            key={id}
            role={role}
            onRoleChange={onScriptUpdate}
          />
        )
      }
      <Button
        type="ghost"
        className="w-32"
        size="small"
        onClick={()=>{
          const roleList = Object.keys(roles);
          roles[roleList[roleList.length-1] + 1] = {
            name: `角色${roleList.length+1}`,
            side: `角色${roleList.length+1}`,
          };
          onScriptUpdate();
        }}
      >
        新建角色
      </Button>
    </>
  );
}

interface ICRole{
  role: IRole;
  onRoleChange: ()=>any;
}

export function CRole({role, onRoleChange}:ICRole){
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