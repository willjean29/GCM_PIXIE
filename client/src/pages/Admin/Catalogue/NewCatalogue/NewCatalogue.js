import React, {useState, useEffect} from 'react';
import {Upload, message, Card, Form, Row, Col, Button} from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import ItemPrize from '../components/ItemPrize';
import Modal from '../../../../components/Admin/Modal';
import {registerCatalogAction} from '../../../../redux/actions/catalogActions';
import {obtenerConcursoAction} from '../../../../redux/actions/competitionActions';
import './NewCatalogue.scss';
const NewCatalogue = (props) => {
  const {categories} = props;
  console.log(categories);
  const dispatch = useDispatch();
  const registerCatalog = (dataCatalog,setReloadPrizes) => dispatch(registerCatalogAction(dataCatalog,setReloadPrizes));
  const obtenerConcurso = () => dispatch(obtenerConcursoAction());
  const { Dragger } = Upload;
  const [files, setFiles] = useState([]);
  const [listFiles, setListFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [contentModal, setContentModal] = useState(null);
  const [cargar, setCargar] = useState(false);
  const propsUpload = {
    name: 'file',
    accept: '.jpg,.png,.jpeg',
    listType: 'picture-card',
    multiple: true,
    fileList: files,
    action: "https://www.mocky.io/v3/b26bdbdd-5368-4c55-a9ef-09f87858e6b4",
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.fileList);
        setFiles(info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onPreview(file) {
      setModalTitle("Item Premio");
      setContentModal(
        <div 
          style={{ 
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"
            }}
        >
          <img 
            src={file.thumbUrl} 
            alt="Imagen de premio referencial"
            style={{
              border: "2px solid black" 
            }}
          />
        </div>
      )
      setShowModal(true);
    }
  };

  useEffect(() => {
    if(listFiles.length > 0){
      console.log(listFiles);
      registerCatalog(listFiles,props.setReloadPrizes);
      props.setShowModal(false);
      setListFiles([]);
      props.setContentModal(null);
      setCargar(false);
      obtenerConcurso();
    }
  }, [listFiles])

  const handleSubmit = () => {
    if(files.length === 0){
      message.error(`Cargue un premio primero`);
    }else{ 
      setCargar(true); 
    }
  }

  return (  
    <>
      {/* <Card>
        <h1 className="title-card">Crear Catálogo de Premios</h1>
      </Card> */}
      <Card
        className="card-upload"
      >
        <Form  layout="vertical"
          onFinish={handleSubmit}
        >
          <Dragger {...propsUpload}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Haga click o arrastre el archivo a esta área para cargar</p>
            <p className="ant-upload-hint">
              Soporte para subida multiple de imagenes (.jpg, .jpeg, .png)
            </p>
          </Dragger>
          {
            files.map((file,index) => (
              <ItemPrize 
                file={file} 
                key={index} 
                setListFiles={setListFiles} 
                setCargar={setCargar} 
                cargar={cargar}
                categories={categories}
              />
            ))
          }
          <br/>
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
      <Modal title={modalTitle} isVisible={showModal} setIsVisible={setShowModal}>
        {contentModal}
      </Modal>
    </>
  );
}
 
export default NewCatalogue;