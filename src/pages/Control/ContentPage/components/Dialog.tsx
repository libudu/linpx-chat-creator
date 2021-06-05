import { useModel } from 'umi';
import { Select, Avatar, InputNumber, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { IDialog } from '@/pages/types';
import { useConfig } from '@/hooks';

const { Option } = Select;
const { TextArea } = Input;

interface CDialogProps {
  index: number;
  dialog: IDialog;
}

export default function CDialog({ index, dialog }: CDialogProps) {
  const { value: defaultDelay } = useConfig('defaultDelay');
  const { roles } = useModel('roles');
  const { setContent, deleteContent, insertDialog } = useModel('contents');

  const { text, from } = dialog;

  if(!dialog.delay) {
    dialog.delay = defaultDelay as number;
  }

  return (
    <div className="px-4 w-full h-full">
      <div className="h-6 mt-1 flex flex-col justify-center items-center relative lp-content-add">
        <div className="bg-gray-300 w-full absolute" style={{height: '1px'}} />
        <div
          className="absolute w-5 h-5 flex items-center justify-between lp-content-add-icon z-20"
          onClick={() => insertDialog(index, {
            from: Object.keys(roles)[0],
            text: "默认对话",
          })}
        />
        <span className="mb-1 text-xl z-10">+</span>
      </div>
      <div className="flex items-center justify-between">
        <div style={{width: '51%'}}>
          <Select
            defaultValue={from}
            bordered={false}
            dropdownStyle={{width:'max-content'}}
            dropdownMatchSelectWidth={false}
            onSelect={(value) => setContent(dialog, { from: value })}
          >
            {
              Object.entries(roles).map(([key, role]) =>
                <Option value={key} key={key}>
                  <div className="flex items-center text-base cdialog-rolebox">
                    <div className="flex items-center">
                      <Avatar className="flex-shrink-0" size={26} src={role.side}>{role.side}</Avatar>
                    </div>
                    <div className="ml-2 u-line-1" style={{maxWidth: "100px"}}>{role.name}</div>
                  </div>
                </Option>
              )
            }
          </Select>
        </div>
        <div className="flex items-center" >
          <span className="ml-2 w-8">延迟</span>
          <InputNumber
            style={{width: "70px"}}
            size={'small'}
            defaultValue={defaultDelay}
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
    </div>
  );
}