import React from 'react';
import {Card, Table} from 'antd';
import { RedditOutlined, InfoCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import moment from 'moment';
const Information = ({administrator}) => {
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
      dato: 'DNI',
      caracteristica: administrator && administrator.dni
    },
    {
      key: '2',
      dato: 'Nombres',
      caracteristica: administrator && administrator.names
    },
    {
      key: '3',
      dato: 'Apellido Paterno',
      caracteristica: administrator && administrator.lastNameP
    },
    {
      key: '4',
      dato: 'Apellido Materno',
      caracteristica:  administrator && administrator.lastNameA
    },
    {
      key: '5',
      dato: 'Fecha de Nacimiento',
      caracteristica: administrator && (administrator.fechaNacimiento ? 
        moment.utc(administrator.fechaNacimiento).format('L') : "DD/MM/YYYY")
    },
    {
      key: '6',
      dato: 'Telefono',
      caracteristica:  administrator && (administrator.telefono ? 
        administrator.telefono : "----------")
    },
    {
      key: '7',
      dato: 'Correo',
      caracteristica: administrator && administrator.email
    },
    {
      key: '8',
      dato: 'Direccion',
      caracteristica: administrator && (administrator.direccion ? 
        administrator.direccion : "----------")
    },
    {
      key: '9',
      dato: 'Departamento',
      caracteristica: administrator && (administrator.departamento ? 
        administrator.departamento : "----------")
    },
    {
      key: '10',
      dato: 'Provincia',
      caracteristica: administrator && (administrator.provincia ? 
        administrator.provincia : "----------")
    },
    {
      key: '11',
      dato: 'Distrito',
      caracteristica: administrator && (administrator.distrito ? 
        administrator.distrito : "----------")
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