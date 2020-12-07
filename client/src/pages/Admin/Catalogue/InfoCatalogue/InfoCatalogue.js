import React from 'react';
import {Card, Table, Space, Tooltip, Button} from 'antd';
import { DeleteOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
const InfoCatalogue = () => {
  const columns = [
    {
      title: 'IMG',
      dataIndex: 'image',
      key: 'image'
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Puntos',
      dataIndex: 'points',
      key: 'points'
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category'
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (namecsv) => (
        <Space size='middle'>
          <Tooltip title="Procesar Archivos">
            <Button type='primary' icon={<CheckCircleOutlined />} >
            </Button>
          </Tooltip>
          <Tooltip title="Ver detalle de archivo">
            <Button type='primary' icon={<EyeOutlined />} >
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar Archivo">
            <Button type='primary' danger icon={<DeleteOutlined />} >
            </Button>
          </Tooltip>
        </Space>
      )
    }
  ]
  return (  
    <>
      <Card>
          <h1 className="title-card">Lista de premios en el catalogo</h1>
      </Card>
      <Card>
        <Table
          columns={columns}
        />
      </Card>
    </>
  );
}
 
export default InfoCatalogue;