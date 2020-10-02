/* eslint-disable react/react-in-jsx-scope */
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import React from 'react';
const { Dragger } = Upload;

export default function MyUpload({handleImage}){

const props = {
  name: 'file',
  //multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  accept:'.png, .jpeg, .jpg, .pdf',
  //showUploadList:{showDownloadIcon:false},
  showUploadList:false,
  onChange(info) {
    const { status } = info.file;
    info.fileList = info.fileList.slice(-1);
    if (status !== 'uploading') {
      //console.log(info.fileList, info.fileList.length);
      console.log(info.file);
      handleImage(info.file.originFileObj);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

return(
  <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload(JPG,PNG,JPEG,PDF)</p>
    {/* <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p> */}
  </Dragger>
);
  
}