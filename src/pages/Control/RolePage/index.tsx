import { useModel } from 'umi';
import { Button } from 'antd-mobile';
import { IRole } from '@/pages/types';
import Role from './Role';
import { memo } from 'react';

interface IRolePage{
  onClickSide: (role:IRole) => any;
}

const RolePage: React.FC<IRolePage> = ({ onClickSide }: IRolePage) => {
  const { roles, addRole } = useModel('roles');
  return (
    <>
      {
        roles.map(role =>
          <Role key={role.id} role={role} onClickSide={onClickSide} />
        )
      }
      <Button type="ghost" size="small" onClick={() => addRole()}>
        新建角色
      </Button>
    </>
  );
}

export default memo(RolePage);