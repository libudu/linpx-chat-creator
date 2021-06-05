import { useModel } from 'umi';
import { Button } from 'antd';

const RunningModal: React.FC = () => {
  const { run, setRun } = useModel('app');

  if(!run) return null;

  return (
    <div className="absolute w-full h-full z-50 bg-black bg-opacity-50 top-0 flex items-center justify-center">
      <Button className="w-32" type="primary" danger size="large" onClick={()=>setRun(false)}>
        结束运行
      </Button>
    </div>
  );
};

export default RunningModal;