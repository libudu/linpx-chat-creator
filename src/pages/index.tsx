import Control from './Control/index';
import Chat from '@/pages/Chat';

export default function IndexPage() {
  return (
    <div className="flex justify-center items-center h-screen overflow-scroll">
      <div className="flex flex-row h-screen py-10">
        <Control
          className="h-full"
          style={{width: '350px', border: '1px solid black', borderRadius: '5px'}}
        />
        <Chat
          className="h-full"
          style={{width: '350px', border: '1px solid black', borderRadius: '5px'}}
        />
      </div>
    </div>
  );
}
