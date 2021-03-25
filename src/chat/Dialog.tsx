import './Dialog.less';

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
    <img className="dialog-side" src={side} />
    <div className="w-full">
      <div className="dialog-name">{ showName && name}</div>
      <div className="dialog-text">{text}</div>
    </div>
  </div>
  );
}