import React,{useState} from 'react'
//import { green } from '@ant-design/colors';
import {Layout, Card, Table, Tag, Space, Button } from 'antd' // Esto sirve para importar los componentes
import { DownloadOutlined, UploadOutlined, FileExcelOutlined, SafetyOutlined,EyeOutlined,CheckCircleOutlined } from '@ant-design/icons'
import Modal from '../../../components/Admin/Modal';
import UploadFileForm from '../../components/UploadFileForm'
import './Files.scss' // importa el css


const Files = (props) => {
  const {Content} = Layout;
  const {TableLayout} = Card;


  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [contentModal, setContentModal] = useState(null);

  const uploadHandlerFunction = () =>{

    setModalTitle("Cargar Archivo");
    setContentModal(
      <UploadFileForm setShowModal = {setShowModal}/>
    )
  
    setShowModal(true);
   
  }

  const columns = [
    {
      title: 'Icono',
      dataIndex: 'icon',
      key: 'icon',
      render: text => <FileExcelOutlined />
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Estado',
      key: 'status',
      render: () => <SafetyOutlined /> // Acá podria enviarse el color del icono unu
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'types',
      render: () => 'Registro de Ventas'
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (namecsv) => (
        <Space size='middle'>
          <Button type='primary' icon={<CheckCircleOutlined />}>
          </Button>
          <Button type='primary' icon={<EyeOutlined />} >
          </Button>
        </Space>
      )
    }
  ]

  const data = [
    {
      key: '1',
      name: 'registroVentas052020.csv',
      age: 32,
      address: 'New York No. 1 Lake Park'
    }
  ]
  return (
    <Layout className='files'>
      <Content className='files__content'>
        <h1 className='files__content-title'>Registros de Ventas</h1>
        <Content className='files__content-functions-buttons'>
          <Space size='middle'>
            <Button icon={<UploadOutlined />} type='primary'>
              Cargar registros
            </Button>
            <Button icon={<DownloadOutlined />} onClick = {uploadHandlerFunction}>
              Descargar template
            </Button>
          </Space>
        </Content>
        <br/>
        <Card className='files__content-body'>
          <Table className='files__content-body-table' columns={columns} dataSource={data} />
        </Card>
      </Content>
    </Layout>
  // <h1>Estamos en el manejador de archivo-templates del administrador</h1>
/*
  <Modal
        title={modalTitle}
        isVisible = {showModal}
        setIsVisble = {setShowModal}
      >
      {contentModal}
    </Modal>
*/
  );
}

export default Files
