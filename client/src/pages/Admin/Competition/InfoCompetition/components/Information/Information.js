import React from 'react';
import {Card, Table} from 'antd';
import './Information.scss';
const Information = () => {
  const columns = [
    {
      title: 'Dato',
      dataIndex: 'dato',
      key: 'dato',
      render: (text) => (
        <span style={{fontWeight: 'bold'}}>{text}</span>
      )
    },
    {
      title: 'Carácteristica',
      dataIndex: 'caracteristica',
      key: 'caracteristica',
    }
  ]

  const data = [
    {
      key: '1',
      dato: 'Fecha Inicio',
      caracteristica: '----------'
    },
    {
      key: '2',
      dato: 'Fecha Fin',
      caracteristica: '----------'
    },
    {
      key: '3',
      dato: 'Empresa',
      caracteristica: '----------'
    },
    {
      key: '4',
      dato: 'Participantes',
      caracteristica: '----------'
    },
    {
      key: '5',
      dato: 'Parámetro',
      caracteristica: '----------'
    },
    {
      key: '6',
      dato: 'Puntos',
      caracteristica: '----------'
    },
  ]
  return (  
    <Card>
      <Table 
        columns={columns} 
        dataSource={data}
        pagination={false}
        bordered
        className="table-competition"
      />
    </Card>
  );
}
 
export default Information;