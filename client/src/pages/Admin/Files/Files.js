import React from 'react'
import { Layout, Card, Table, Tag, Space, Button } from 'antd' // Esto sirve para importar los componentes
import { DownloadOutlined ,UploadOutlined,FileExcelOutlined ,SafetyOutlined} from '@ant-design/icons';

import './Files.scss' // importa el css

const Files = () => {
  const {Content} = Layout
  const {TableLayout} = Card
  // Borrar esto unu
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
      render: (color) =><SafetyOutlined /> //Acá podria enviarse el color del icono unu
    },
    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'types',
      render: text => "Registro de Ventas"
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (namecsv)=> (
        <Space size='middle'>
          <Button type='primary' icon={<DownloadOutlined />}>
                C
              </Button>
          <Button >
                D
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
      address: 'New York No. 1 Lake Park',
    }
  ]
  return (
    <Layout className='files'>
      <Content className='files__content'>
        <h1 className='files__content-title'>Registro de Ventas</h1>
        <Card className='files__content-functions'>
          <Content className='files__content-functions-buttons'>
            <Space size='middle'>
              <Button name='btn_upload' icon={<UploadOutlined />} type='primary'>
                Cargar registros
              </Button>
              <Button name='btn_download' icon={<DownloadOutlined />}>
                Descargar template
              </Button>
            </Space>
          </Content>
        </Card>
        <br />
        <Card className='files__content-body'>
          <Table className='files__content-body-table' columns={columns} dataSource={data} />
        </Card>
      </Content>
    </Layout>
  // <h1>Estamos en el manejador de archivo-templates del administrador</h1>
  )
}

export default Files