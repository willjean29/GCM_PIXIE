import React from 'react';
import { Layout, Card, Table, Spin} from 'antd' // Esto sirve para importar los componentes
import {useSelector} from 'react-redux';
import './ViewFile.scss' // importa el css

const ViewFile = (props) => {
  const {Content} = Layout
  const dataFiles = useSelector(state => state.files.fileCurret);
  const loading = useSelector(state => state.files.loading);
  const columns = [
    {
      title: 'ID',
      key: 'ID',
      dataIndex: 'ID'
    },
    {
      title: 'DNI',
      key: 'DNI',
      dataIndex: 'DNI'
    },
    {
      title: 'Nombres',
      key: 'Nombres',
      dataIndex: 'Nombres'
    },
    {
      title: 'Apellidos',
      key: 'Apellidos',
      dataIndex: 'Apellidos'
    },
    {
      title: 'Método de Pago',
      key: 'Metodo_Pago',
      dataIndex: 'Metodo_Pago'
    },
    {
      title: 'Total Venta',
      key: 'Total_Venta',
      dataIndex: 'Total_Venta'
    },
    {
      title: 'Fecha Venta',
      key: 'Fecha_Venta',
      dataIndex: 'Fecha_Venta'
    }
  ]

  const data = dataFiles;
  return (
    <Layout className='files'>
      <Content className='files__content'>
        <h1 className='files__content-title'>Registros de Ventas</h1>
        <br/>
        <Card className='files__content-body'>
          <Spin size="large" spinning={loading}>
            <Table className='files__content-body-table' 
              columns={columns} 
              dataSource={data} 
              scroll={{x: 380}}
            />
          </Spin>
        </Card>
      </Content>
    </Layout>

  )
}

export default ViewFile
