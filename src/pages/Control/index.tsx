import { Tabs, Button } from 'antd-mobile';
import classnames from 'classnames';
import { IScript } from '@/chat/types';
import CRole from './CRole';
import { renderContent, ContentPage } from './CContent';

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
              <CRole
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
        </TabBox>
        <TabBox>
          <ContentPage script={script} onScriptUpdate={onScriptUpdate} />
        </TabBox>
        <TabBox>修改配置</TabBox>
      </Tabs>
    </div>
  );
}