import React, { useState } from 'react'
// import { green } from '@ant-design/colors'
import { Layout, Card, Table, Tooltip, Space, Button } from 'antd' // Esto sirve para importar los componentes
import {DownloadOutlined, UploadOutlined, FileExcelOutlined, SafetyOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons'
import Modal from '../../../components/Admin/Modal'
import UploadFileForm from './UploadFileForm'
import './Files.scss' // importa el css

const Files = (props) => {
  const {Content} = Layout;
  const {TableLayout} = Card;
 
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
          <Button type='primary' icon={<EyeOutlined />}>
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
            <Tooltip placement='top' title={text_upload}>
              <Button icon={<UploadOutlined />} type='primary' onClick={uploadHandlerFunction}>
                Cargar registros
              </Button>
            </Tooltip>
            <Tooltip placement='top' title={text_download}>
              <Button icon={<DownloadOutlined />}> 
              
                Descargar template
              </Button>
            </Tooltip>
          </Space>
        </Content>
        <br/>
        <Card className='files__content-body'>
          <Table className='files__content-body-table' columns={columns} dataSource={data} />
        </Card>
      </Content>
      <Modal title={modalTitle} isVisible={showModal} setIsVisible={setShowModal}>
        {contentModal}
      </Modal>
    </Layout>

  )
}

export default Files
