//Content: Compnente de la tabla donde se observan los archivos del registro de ventas
import React from 'react'

import { Layout, Card, Table} from 'antd' 
import './ViewFile.scss'

const ViewFile = (props) => {
  const {Content} = Layout

  const columns = [
    {
      title: 'ID',
      key: 'id'
      },
    {
      title: 'DNI',

      key: 'dni'
    },
    {
      title: 'Apellido',
      key: 'lastname'
       },
    {
      title: 'Tipo de pago',
      key: 'type'
   
    },
    {
      title: 'Monto Total',
      key: 'amount'

    },
    {
      title: 'Fecha',
      key: 'date'

    }
  ]

  const data = [
    {
      key: '1',
      id: "01",
      dni: "73008470",
      name: 'Name',
      lastname: 'Lastname',
      type: 'Efectivo',
      amount: 158.9,
      date: '2020-10-10'
    }
  ]
  return (
    <Layout className='vfiles'>
      <Content className='vfiles__content'>
        <h1 className='vfiles__content-title'>Registros de Ventas</h1>
        <br/>
        <Card className='vfiles__content-body'>
          <Table className='vfiles__content-body-table' columns={columns} dataSource={data} />
        </Card>
      </Content>
    </Layout>

  )
}

export default ViewFile
