// Componente para Modal de Carga de Archivos
import React, {useState} from 'react';
import { Form, Col, Row, Button,Upload, Layout, Card, message  } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import './UploadFileForm.scss'
const UploadFileForm = ({setShowModal, registrarArchivo, setReloadFiles, setContentModal}) => {
  const {Content} = Layout;
  const { Dragger } = Upload;
  const [fileList, setFileList] = useState([]);
  const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    accept : ".csv",
    defaultFileList: fileList,
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setFileList(info.fileList);
      }
      if (status === 'done') {
        message.success(`La carga del archivo ${info.file.name} fue exitosa.`);
      } else if (status === 'error') {
        message.error(`La carga del archivo ${info.file.name} falló.`);
      }
    },
  }

  const handlerSubmitFiles = () => {
    if(fileList.length === 0){
      message.error(`Cargue un registro de Venta`);
    }else{
      registrarArchivo(fileList);
      message.success(`Archivo Registrado`);
      setFileList([]);
      setReloadFiles(true);
      setShowModal(false);
      setContentModal(null);
    }
  }

  return (
    <Layout>
      <Content>
        <Card>
       
        <Form
          className="forms"
          onFinish={handlerSubmitFiles}
        >
           
          <Dragger {...props}>
            <p className='ant-upload-drag-icon'>
              <InboxOutlined />
            </p>
            <p className='ant-upload-text'>
             Haga click o arrastre el archivo a esta área para cargar.
            </p>
            <p className='ant-upload-hint'>
             Soporte para una carga única del Registro de Ventas.
            </p>
          </Dragger>
         
         <br></br>
          <Row justify="center"> 
            <Col span={24} md={8}>
              <Form.Item style={{textAlign: 'center' }}>          
                <Button type="primary" htmlType="submit" className="btn-submit" size="large">
                  Enviar archivo
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        
        </Card>
      </Content>
    </Layout>
  )
}

export default UploadFileForm;
