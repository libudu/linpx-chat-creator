import { memo } from "react";

interface InsertContentProps {
  index: number;
  newContent: (index: number) => void;
}

// 性能优化保持函数纯粹和key与index相关后，插入新Content只会渲染一次InsertContent
const InsertContent: React.FC<InsertContentProps> = ({ index, newContent }) => {
  return (<>
    <div className="h-6 mt-1 flex flex-col justify-center items-center relative lp-content-add">
      <div className="bg-gray-300 w-full absolute" style={{height: '1px'}} />
      <div
        className="absolute w-5 h-5 flex items-center justify-between lp-content-add-icon z-20"
        onClick={() => newContent(index)}
      />
      <span className="mb-1 text-xl z-10">+</span>
    </div>
  </>)
};

export default memo(InsertContent);