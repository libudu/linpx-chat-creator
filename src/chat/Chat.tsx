import Dialog from './Dialog';
import classnames from 'classnames';
import Header from './Header';
import { IScript, IContent, IDialog, IRole } from './types';
import { getRandomNum } from '@/utils/util';

interface IPreview{
  className?: any
  style?: any;
  script: IScript;
}

function renderContent(content:IContent, roles:{ [id: string]: IRole}){
  // 还没id则生成id
  if(!content.id) content.id = getRandomNum();
  // @ts-ignore
  const { type } = content;
  // 没有type参数，是对话
  if(!type) {
    const { text, from, id } = content as IDialog;
    const { name, side, isMain } = roles[from];
    //console.log(content.from, roles);
    return <Dialog key={id} name={name} side={side} text={text} isRight={isMain} />
  }
}


export default function Preview({script, className, style}:IPreview){
  const { roles, contents, configs } = script;
  const { title, subTitle } = configs;

  return (
    <div className={classnames(className, 'bg-gray-100 h-full w-full relative')} style={style}>
      <Header title={title} subTitle={subTitle} />
      <div className="h-full pt-10 pb-12 flex-grow-0 flex flex-col overflow-y-scroll">
        {
          contents.map(ele=>renderContent(ele, roles))
        }
      </div>
      <div className="absolute w-full h-12 bg-white" style={{bottom: "0"}}>
      </div>
    </div>
  );
}