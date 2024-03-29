import { useModel } from 'umi';
import { Select, Avatar } from 'antd';
import { IDialog } from '@/pages/types';
import { memo } from 'react';

const { Option } = Select;

interface SidePickerProps {
  dialog: IDialog;
}

// 会跟着Dialog一起重渲染，新增角色、切换头像时也会全部重渲染
const SidePicker: React.FC<SidePickerProps> = ({ dialog }) => {
  const { roles } = useModel('roles');
  const { setContent } = useModel('contents', ({ setContent }) => ({ setContent }));

  return (
    <Select
      defaultValue={dialog.from}
      bordered={false}
      dropdownStyle={{ width:'max-content' }}
      dropdownMatchSelectWidth={false}
      onSelect={(value) => setContent(dialog, { from: value })}
    >
      {
        roles.map(({ id, side, name }) =>
          <Option value={id} key={id}>
            <div className="flex items-center text-base cdialog-rolebox">
              <div className="flex items-center">
                <Avatar className="flex-shrink-0" size={26} src={side}>{side}</Avatar>
              </div>
              <div className="ml-2 u-line-1" style={{maxWidth: "100px"}}>{name}</div>
            </div>
          </Option>
        )
      }
    </Select>
  )
};

export default memo(SidePicker);