import { useModel } from 'umi';
import { Input, Avatar, Switch } from 'antd';
import { IRole } from '@/pages/types';
import { Button } from 'antd-mobile';

interface IRolePage{
  onClickSide: (role:IRole)=>any;
}

export default function RolePage({ onClickSide }:IRolePage) {
  const { roles, addRole } = useModel('roles');
  return (
    <>
      {
        Object.entries(roles).map(([id, role]) =>
          <CRole
            key={id}
            role={role}
            onClickSide={onClickSide}
          />
        )
      }
      <Button
        type="ghost"
        className="w-32"
        size="small"
        onClick={() => addRole()}
      >
        新建角色
      </Button>
    </>
  );
}

interface ICRole{
  role: IRole;
  onClickSide: (role:IRole)=>any;
}

export function CRole({ role, onClickSide }:ICRole){
  const { setRole } = useModel('roles');
  
  const { side, name, isMain } = role;

  return (
    <div className="flex my-4 text-lg">
      <div
        className="mr-4 lp-choose-side"
        onClick={()=>onClickSide(role)}
      >
        <Avatar size={60} src={side} gap={5} >{side}</Avatar>
      </div>
      <div className="h-8">
        <Input
          maxLength={40}
          defaultValue={name}
          onChange={(e)=>{
            const newName = e.target.value
            if(newName !== name) {
              setRole(role, { name: newName })
            }
          }}
        />
        <div className="flex items-center h-10">
          <div className="mr-4">靠右</div>
          <div>
            <Switch
              defaultChecked={isMain}
              onChange={() => setRole(role, { isMain: !isMain })}
            />
          </div>
        </div>
      </div>
    </div>
  );
}