import { memo } from 'react';
import { useModel } from 'umi';
import { Select, Avatar, InputNumber, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { IDialog } from '@/pages/types';
import SidePicker from './SidePicker';

const { Option } = Select;
const { TextArea } = Input;

interface CDialogProps {
  dialog: IDialog;
}

// 性能优化：
// 角色换头像不会触发整体重渲染，只会触发SidePicker重渲染
// 修改延迟、切换人物都只会触发自身重渲染
const CDialog: React.FC<CDialogProps> = ({ dialog }) => {


  // contents变动不触发更新，只依赖于传入的dialog
  const { setContent, deleteContent } = useModel(
    'contents', 
    ({setContent, deleteContent}) => ({ setContent, deleteContent }),
  );

  const { text } = dialog;

  return (
    <>
      <div className="flex items-center justify-between">
        <div style={{width: '51%'}}>
          <SidePicker dialog={dialog} />
        </div>
        <div className="flex items-center" >
          <span className="ml-2 w-8">延迟</span>
          <InputNumber
            style={{width: "70px"}}
            size={'small'}
            value={dialog.delay}
            min={0} max={100} step={0.1} precision={2}
            onChange={e => setContent(dialog, { delay: e }) }
          />
        </div>
        <div
          className="text-lg lp-delete-icon flex items-center justify-center p-1"
          onClick={() => deleteContent(dialog)}
        >
          <DeleteOutlined />
        </div>
      </div>
      <div className="my-1">
        <TextArea
          style={{wordBreak: 'break-all'}}
          defaultValue={text}
          autoSize={{ minRows: 1, maxRows: 3 }}
          onChange={e => setContent(dialog, { text: e.target.value })}
        />
      </div>
    </>
  );
}

export default memo(CDialog);