// Componente para Modal de Carga de Archivos
import React from 'react'
import { Space,Form, Col, Row, Button,Upload, Layout, Card, message  } from 'antd' // Esto sirve para importar los componentes
import { InboxOutlined } from '@ant-design/icons'
import './UploadFileForm.scss'
const UploadFileForm = () => {
  const {Content} = Layout;
  const { Dragger } = Upload;

  const props = {
    name: 'file',
    multiple: false,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    accept : ".csv",
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`La carga del archivo ${info.file.name} fue exitosa.`)
      } else if (status === 'error') {
        message.error(`La carga del archivo ${info.file.name} falló.`)
      }
    }
  }

  return (
    <Layout>
      <Content>
        <Card>
       
        <Form
          className="forms"
         // onFinish={}
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
              <Form.Item>
                
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
