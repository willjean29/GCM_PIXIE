import React, { useState } from 'react'
//import { green } from '@ant-design/colors'
import { Layout, Card, Table, Tooltip, Space, Button } from 'antd' // Esto sirve para importar los componentes
import { DeleteOutlined,DownloadOutlined, UploadOutlined, FileExcelOutlined, SafetyOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons'
import Modal from '../../../components/Admin/Modal'
import UploadFileForm from './UploadFileForm'
import './Files.scss' // importa el css

const Files = (props) => {
  const {Content} = Layout
  // const {TableLayout} = Card

  const text_upload = '¡Carga el RV del mes!'
  const text_download = 'Descarga el template del RV'

  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [contentModal, setContentModal] = useState(null)

  const uploadHandlerFunction = () => {

    setModalTitle('Cargar Registro de Ventas')
    setContentModal(
      <UploadFileForm setShowModal={setShowModal} />
    )

    setShowModal(true)
  }

  const columns = [
    {
      title: 'Icono',
      dataIndex: 'icon',
      key: 'icon',
      render: () => <FileExcelOutlined/>
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Estado',
      key: 'status',
      render: () => <SafetyOutlined/> // Acá podria enviarse el color del icono unu
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
          <Button type='primary' icon={<CheckCircleOutlined />} >
          </Button>
          <Button type='primary' icon={<EyeOutlined />} >
          </Button>
          <Button type='primary' danger icon={<DeleteOutlined />} >
          </Button>
        </Space>
      )
    }
  ]

  const data = [
    {
      key: '1',
      name: 'registroVentas052020.csv',
    }
  ]
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
              <Button icon={<DownloadOutlined />} href='www.google.com'>
                Descargar template
              </Button>
            </Tooltip>
          </Space>
        </Content>
        <br/>
        <Card className='files__content-body'>
          <Table className='files__content-body-table' columns={columns} dataSource={data} scroll={{x: 380}}/>
        </Card>
      </Content>
      <Modal title={modalTitle} isVisible={showModal} setIsVisible={setShowModal}>
        {contentModal}
      </Modal>
    </Layout>

  )
}

export default Files
