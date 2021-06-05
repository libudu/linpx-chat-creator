import { useModel } from 'umi';
import { Input, Avatar, Switch } from 'antd';
import { IRole } from '@/pages/types';
import { memo } from 'react';

interface RoleProps {
  role: IRole;
  onClickSide: (role:IRole) => any;
}

// 仅在初始化和切换头像时重渲染
const Role: React.FC<RoleProps> = ({ role, onClickSide }) => {
  const { setRole } = useModel('roles', ({ setRole }) => ({ setRole }));
  
  const { side, name, isMain } = role;

  return (
    <div className="flex my-4 text-lg">
      <div
        className="mr-4 lp-choose-side"
        onClick={()=>onClickSide(role)}
      >
        <Avatar size={60} src={side} gap={5} >{side}</Avatar>
      </div>
      <div className="h-8 w-48 mt-1">
        <Input
          maxLength={30}
          defaultValue={name}
          onChange={(e)=>{
            const newName = e.target.value
            if(newName !== name) {
              setRole(role, { name: newName })
            }
          }}
        />
        <div className="flex items-center h-9">
          <div className="mr-4 mb-1">靠右</div>
          <Switch
            defaultChecked={isMain}
            onChange={() => setRole(role, { isMain: !isMain })}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(Role);