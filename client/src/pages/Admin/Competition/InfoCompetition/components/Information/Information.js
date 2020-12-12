import React from 'react';
import {Card, Table} from 'antd';
import moment from 'moment';
import './Information.scss';
const Information = ({competition}) => {
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
      caracteristica: competition && moment.utc(competition.fechaInicio).format('L')
    },
    {
      key: '2',
      dato: 'Fecha Fin',
      caracteristica: competition && moment.utc(competition.fechaFin).format('L')
    },
    {
      key: '3',
      dato: 'Empresa',
      caracteristica: competition && (competition.business.nombreComercial !== '-' ? 
        competition.business.nombreComercial : competition.business.razonSocial)
    },
    {
      key: '4',
      dato: 'Participantes',
      caracteristica: competition && competition.business.clientes.length
    },
    {
      key: '5',
      dato: 'Parámetro',
      caracteristica: `S/. ${competition && competition.reglas.parametro}`
    },
    {
      key: '6',
      dato: 'Puntos',
      caracteristica: competition && competition.reglas.puntos
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