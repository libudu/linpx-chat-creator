import { Tabs, Button } from 'antd-mobile';
import classnames from 'classnames';
import { IScript, IContent, IDialog, IRole } from '@/chat/types';
import CRole from './CRole';
import { CDialog } from './CContent';

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

function renderContent(content:IContent, roles:{ [id: string]: IRole}, onContentUpdate:()=>void){
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  if(!type) {
    const dialog = content as IDialog;
    //console.log(content.from, roles);
    return <CDialog roles={roles} dialog={dialog} onDialogChange={onContentUpdate} />
  }
}

export default function Preview({className, style, script, onScriptUpdate}:IControl){
  const { roles, contents } = script;
  const content = contents[0];
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
          <Button type="ghost" className="w-32" size="small">新建角色</Button>
        </TabBox>
        <TabBox>
          {
            contents.map(content=>renderContent(content, roles, onScriptUpdate))
          }
        </TabBox>
        <TabBox>修改配置</TabBox>
      </Tabs>
    </div>
  );
}