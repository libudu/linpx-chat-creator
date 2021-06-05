import { IRole } from '@/pages/types';
import initScript from '../scripts';
import { useArrayItem } from "./utils/useArrayItem";

export default function() {
  const {
    items: roles,
    itemSet: roleSet,
    setItem: setRole,
    insertItem,
    deleteItem: deleteRole,
  } = useArrayItem(initScript.roles, 'roles');

  const addRole = () => {
    const id = roles.length + 1;
    const newRole: IRole = {
      id: String(id), 
      name: `角色${id + 1}`,
      side: `角色${id + 1}`,
    };
    insertItem(roles.length, newRole);
  };

  return {
    roles,
    setRole,
    roleSet,
    addRole,
    deleteRole,
  };
}
