import React, { useState } from 'react'

import { Layout, Card, Table, Tooltip, Space, Button } from 'antd' // Esto sirve para importar los componentes
import { DeleteOutlined, DownloadOutlined, UploadOutlined, FileExcelOutlined, SafetyOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons'

import './ViewFile.scss' // importa el css

const ViewFile = (props) => {
  const {Content} = Layout
  const {TableLayout} = Card


  const columns = [
    {
      title: 'ID',

      key: 'id'
    // render: () => <FileExcelOutlined/>
    },
    {
      title: 'DNI',

      key: 'dni'
    },
    {
      title: 'Apellido',
      key: 'lastname'
    //    render: () => <SafetyOutlined/> // Acá podria enviarse el color del icono unu
    },
    {
      title: 'Tipo de pago',

      key: 'type'
    // render: () => 'Registro de Ventas'
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
