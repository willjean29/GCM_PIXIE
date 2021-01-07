import React, { useState, useEffect } from 'react'
//import { green } from '@ant-design/colors'
import { useHistory } from 'react-router-dom';
import { Layout, Card, Table, Tooltip, Space, Button, Spin, Modal as ModalAnt} from 'antd' // Esto sirve para importar los componentes
import { DeleteOutlined,DownloadOutlined, UploadOutlined, FileExcelOutlined, SafetyOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {useSelector,useDispatch} from 'react-redux';
import Modal from '../../../components/Admin/Modal';
import UploadFileForm from './UploadFileForm';
import {
  registrarArchivoAction,
  obtenerArchivosAction,
  detalleArchivoAction,
  eliminarArchivoAction,
  procesarArchivoAction
} from '../../../redux/actions/fileActions';
import './Files.scss' // importa el css

const Files = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {confirm} = ModalAnt;
  const registrarArchivo = (file) => dispatch(registrarArchivoAction(file));
  const obtenerArchivos = () => dispatch(obtenerArchivosAction());
  const detalleArchivo = (file) => dispatch(detalleArchivoAction(file));
  const eliminarArchivo = (file) => dispatch(eliminarArchivoAction(file));
  const procesarArchivo = (file,setReloadFiles) => dispatch(procesarArchivoAction(file,setReloadFiles));
  const listaArchivos = useSelector(state => state.files.data);
  const {Content} = Layout
  // const {TableLayout} = Card

  const text_upload = '¡Carga el RV del mes!'
  const text_download = 'Descarga el template del RV'

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [contentModal, setContentModal] = useState(null);
  const [reloadFiles, setReloadFiles] = useState(false);
  useEffect(() => {
    obtenerArchivos();
    setReloadFiles(false);
    // eslint-disable-next-line
  }, [dispatch,reloadFiles])

  const uploadHandlerFunction = () => {

    setModalTitle('Cargar Registro de Ventas')
    setContentModal(
      <UploadFileForm 
        setShowModal={setShowModal} 
        registrarArchivo={registrarArchivo}
        setReloadFiles={setReloadFiles}
        setContentModal={setContentModal}
      />
    )

    setShowModal(true)
  }

  const handleGetFile = (file) => {
    detalleArchivo(file);
    history.push(`/admin/files/${file._id}`)
  }

  const handleDeleteFile = (file) => {
    confirm({
      title: "Eliminar Archivo",
      content: "Un archivo eliminado no se puede recuperar",
      okText: 'Eliminar',
      okType: "danger",
      cancelText: 'Cancelar',
      onOk: () => {
        console.log("Eliminar ", file._id);
        eliminarArchivo(file);
        setReloadFiles(true);
      }
    })
  }

  const handleFileProcessing = (file) => {
    procesarArchivo(file,setReloadFiles);
  }

  const columns = [
    {
      title: 'Icono',
      dataIndex: 'icon',
      key: 'icon',
      render: () => (
        <div style={{textAlign: 'center'}}>
          <FileExcelOutlined/>
        </div>
      )
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Estado',
      key: 'estado',
      // dataIndex: 'estado',
      render: (file) => (
        <div style={{textAlign: 'center'}}>
          {file.estado ? (
            <Tooltip title="Archivo Cargado">
              <SafetyOutlined style={{ color: "green"}}/>
            </Tooltip>
            
          ) : (
            <Tooltip title="Archivo no Cargado">
              <SafetyOutlined style={{ color: "red"}} onClick={() => handleFileProcessing(file)}/>
            </Tooltip>
          )}
        </div>
      ) // Acá podria enviarse el color del icono unu
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
      render: (file) => (
        <Space size='middle'>
          <Tooltip title="Procesar Archivos">
            <Button type='primary' icon={<CheckCircleOutlined />} >
            </Button>
          </Tooltip>
          <Tooltip title="Ver detalle de archivo">
            <Button type='primary' icon={<EyeOutlined />} onClick={() => handleGetFile(file)}>
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar Archivo">
            <Button type='primary' danger icon={<DeleteOutlined />} onClick={() => handleDeleteFile(file)}>
            </Button>
          </Tooltip>
        </Space>
      )
    }
  ]

  const data = listaArchivos;
  return (
    <Layout className='files'>
      <Content className='files__content'>
        <Card>
          <h1 className='files__content-title'>Registros de Ventas</h1>
        </Card>
        <Content className='files__content-functions-buttons'>
          <Space size='middle'>
            <Tooltip placement='top' title={text_upload}>
              <Button icon={<UploadOutlined />} type='primary' onClick={uploadHandlerFunction}>
                Cargar registros
              </Button>
            </Tooltip>
            <Tooltip placement='top' title={text_download}>
              <Button icon={<DownloadOutlined />} href={`${process.env.REACT_APP_API_URL}/uploads/Template.csv`}>
                Descargar template
              </Button>
            </Tooltip>
          </Space>
        </Content>
        <br/>
        <Card className='files__content-body'>
          <Spin size="large" spinning={listaArchivos ? false : true}>
            <Table 
              className='files__content-body-table' 
              columns={columns} 
              dataSource={data} 
              scroll={{x: 380}}
            />
          </Spin>
        </Card>
      </Content>
      <Modal title={modalTitle} isVisible={showModal} setIsVisible={setShowModal}>
        {contentModal}
      </Modal>
    </Layout>

  )
}

export default Files
