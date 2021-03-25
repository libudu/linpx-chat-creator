import { Tabs, Button } from 'antd-mobile';
import { Input, Avatar, Switch } from 'antd';
import classnames from 'classnames';
import SideImg from '@/assets/test.jpg';
import { IScript, IRole } from '@/chat/types';

interface IControl{
  className?: any;
  style?: any;
  script: IScript;
  onScriptUpdate: ()=>any;
}

function TabBox({children}:{children:any}){
  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: 'max-content', minHeight: '200px' }}
    >
      {children}
    </div>
  );
}

interface IControlRole{
  role: IRole;
  onRoleChange: ()=>any;
}

function Role({role, onRoleChange}:IControlRole){
  const { side, name, isMain } = role;
  return (
    <div className="flex my-4 text-lg">
      <div className="mr-4" >
        <Avatar size={60} src={side}/>
      </div>
      <div className="h-8">
        <Input
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

const tabs = [
  { title: '角色', sub: '1' },
  { title: '对话', sub: '2' },
  { title: '配置', sub: '3' },
];

export default function Preview({className, style, script, onScriptUpdate}:IControl){
  const { roles, contents } = script;
  return (
    <div className={classnames(className, "bg-white")} style={style}>
      <Tabs tabs={tabs}
        initialPage={0}
        onChange={(tab, index) => { console.log('onChange', index, tab); }}
        onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
      >
        <TabBox>
          {
            Object.values(roles).map(role=>
              <Role
                role={role}
                onRoleChange={()=>{onScriptUpdate();}}
              />
            )
          }
          <Button type="ghost" className="w-32" size="small">新建角色</Button>
        </TabBox>
        <TabBox>新建对话</TabBox>
        <TabBox>修改配置</TabBox>
      </Tabs>
    </div>
  );
}