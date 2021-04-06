import { Button, Avatar, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

let defaultSides:any[] = [];
for(let i=1; i <= 12; i++){
  defaultSides.push(require(`@/assets/defaultSides/${i}.jpg`));
}

export interface ISelectSide {
  onSelect: (src:any)=>any;
  onCancel: any;
}

function beforeUpload(file:any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传 jpg 和 png !');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('文件最大不超过 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default function SelectSide({ onSelect, onCancel }: ISelectSide){

  const [ uploadImg, setUploadImg ] = useState<any>();

  return (
    <div
      className="w-full h-full absolute z-50 top-0 flex items-center justify-center"
      style={{backgroundColor: '#0004'}}
      onClick={onCancel}
    >
      <div
        className="bg-white text-base pt-2 pb-4"
        style={{width: '90%'}}
        onClick={(e)=>e.stopPropagation()}
      >
        <div className="text-lg text-center">默认图片</div>
        <div className="flex items-center justify-center flex-wrap">
          {
            defaultSides.map((side, index)=>
              <div
                key={index}
                className="mx-1 my-0.5 lp-choose-side"
                onClick={()=>onSelect(side)}
              >
                <Avatar size={40} src={side} />
              </div>
            )
          }
        </div>
        <div className="text-lg text-center">上传图片</div>
        <div className="flex justify-center w-full">
          <div>
            <Upload
              listType={uploadImg ? "picture" : "picture-card"}
              showUploadList={false}
              accept={"image/png, image/jpeg, image/gif"}
              beforeUpload={beforeUpload}
              onChange={(info)=>{
                const file = info.file;
                if(file.status === 'done'){
                  const img = file.originFileObj;
                  const reader = new FileReader();
                  reader.addEventListener('load', () => {
                    const imageUrl = reader.result;
                    setUploadImg(imageUrl);
                  });
                  reader.readAsDataURL(img);
                }
              }}
            >
              {
                uploadImg
                ? <div className="my-2 lp-choose-side">
                    <Avatar size={96} src={uploadImg} />
                  </div>
                : <div>
                    {false ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>上传</div>
                  </div>
              }
            </Upload>
          </div>
        </div>
        <div className="flex justify-center">
          <Button onClick={onCancel}>取消</Button>
          <Button
            type="primary"
            disabled={!Boolean(uploadImg)}
            onClick={()=>onSelect(uploadImg)}
            children="确定"
          />
        </div>
      </div>
    </div>
  );
}