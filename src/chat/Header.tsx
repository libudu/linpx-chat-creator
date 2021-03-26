import { LeftOutlined, MenuOutlined } from '@ant-design/icons';

export default function Header(){
  return (
    <div className="w-full flex items-center h-10 text-center text-base">
      <div style={{width: '20%'}}><LeftOutlined /></div>
      <div style={{width: '60%'}}>
        橘猫的阅读器
      </div>
      <div style={{width: '20%'}}><MenuOutlined /></div>
    </div>
  );
}