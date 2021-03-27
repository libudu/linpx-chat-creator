import './Dialog.less';
import { Avatar } from 'antd';

interface IDialog{
  name: string;
  side: any;
  text: string;
  isRight?: boolean;
  showName?: boolean;
}

export default function Dialog({name, side, text, isRight=false, showName=true}:IDialog){
  return (
    <div className={"dialog " + (isRight ? "dialog-right" : "dialog-left")}>
      <div className="dialog-side">
        <Avatar size={40} src={side}>{side}</Avatar>
      </div>
      <div className="w-full">
        <div className="dialog-name u-line-1">
          <div className="dialog-name-wrapper">
            { showName && name}
          </div>
        </div>
        <div className="dialog-text">{ text || " " }</div>
      </div>
    </div>
  );
}