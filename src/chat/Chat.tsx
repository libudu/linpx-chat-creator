import Dialog from './Dialog';
import classnames from 'classnames';
import Header from './Header';
import { IScript, IContent, IDialog, IRole } from './types';

interface IPreview{
  className?: any
  style?: any;
  script: IScript;
}

function renderContent(content:IContent, roles:{ [id: string]: IRole}){
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  if(!type) {
    content = content as IDialog;
    const role = roles[content.from];
    //console.log(content.from, roles);
    return <Dialog name={role.name} side={role.side} text={content.text} isRight={role.isMain} />
  }
}


export default function Preview({script, className, style}:IPreview){
  const { roles, contents } = script;

  return (
    <div className={classnames(className, 'bg-gray-100 h-full flex flex-col')} style={style}>
      <Header />
      <div className="h-full flex flex-col">
        <div className="flex-grow overflow-y-scroll h-16">
          {
            contents.map(ele=>renderContent(ele, roles))
          }
        </div>
        <div className="h-12 bg-white flex-shrink-0">

        </div>
      </div>
    </div>
  );
}