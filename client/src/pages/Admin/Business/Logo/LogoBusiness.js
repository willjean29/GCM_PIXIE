import React from 'react'
//Upload logo
import { Upload, message, Button, Form,Input, Row, Col} from 'antd';
import { InboxOutlined} from '@ant-design/icons';

import './LogoBusiness.scss';

const LogoBusiness = () => {
  
    const { Dragger } = Upload;

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    return (  
      <>
        <Form
          labelCol={{
            span: 15,
          }}
          wrapperCol={{
            span: 30,
          }}
          layout="horizontal"
          >
            <Row>
            <Col span={5} push={19}>
              <Form.Item  className="input_text">
                <Button type={"primary"}>Enviar</Button>
                
              </Form.Item>
            </Col>
            <Col span={19} pull={5}>
              <Form.Item className="input_text">
                <Input placeholder="Archivo" disabled/>
              </Form.Item>
            </Col>
            </Row>
          </Form>

        <Dragger {...props}>
            <p className="ant-upload-drag-icon"> 
            <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
            band files
            </p>
        </Dragger>
        
      </>
    );
}
export default LogoBusiness; 

/*<Modal
    visible={previewVisible}
    title={previewTitle}
    footer={null}
    onCancel={this.handleCancel}
  >
    <img alt="example" style={{ width: '100%' }} src={previewImage} />
  </Modal>*/

/*function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
  };

  render() {
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
  */