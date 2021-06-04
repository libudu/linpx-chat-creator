import { useState, useCallback } from "react";
import { IRole } from '@/pages/types';
import initScript from '../scripts';

// todo: 防抖，throttle(()=>_setScript(), 200)
export default function() {
  const [roles, setRoles] = useState(initScript.roles);

  const setRole = useCallback((role: IRole) => {
    setRoles({
      ...roles,
      [role.id]: role,
    });
  }, []);

  const addRole = useCallback(() => {
    const roleList = Object.keys(roles);
    const id = String(roleList.length + 1);
    const newRole: IRole = {
      id,
      name: `角色${id + 1}`,
      side: `角色${id + 1}`,
    };
    setRoles({
      ...roles,
      [id]: newRole,
    })
  }, []);

  const deleteRole = useCallback((id) => {
    if(roles[id]) {
      delete roles[id];
      setRoles({...roles});
    } else {
      console.error('[model-script-role-delete] the id does not exist.', id, roles);
    }
  }, []);


  return {
    roles,
    setRole,
    addRole,
    deleteRole,
  };
}
