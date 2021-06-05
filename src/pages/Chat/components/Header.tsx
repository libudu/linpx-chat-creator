import { LeftOutlined, MenuOutlined } from '@ant-design/icons';

interface IHeader{
  title: string;
  subTitle: string;
}

export default function Header({ title, subTitle }: IHeader){
  return (
    <div className="w-full absolute flex items-center h-10 text-center text-base bg-gray-100 z-10">
      <div style={{width: '20%'}}><LeftOutlined /></div>
      <div style={{width: '60%'}}>
        <div className="u-line-1">{title}</div>
        <div className="u-line-1" style={{fontSize:"6px", lineHeight:"12px"}}>{subTitle}</div>
      </div>
      <div style={{width: '20%'}}><MenuOutlined /></div>
    </div>
  );
}