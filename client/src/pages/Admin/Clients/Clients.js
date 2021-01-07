import React, {useState} from 'react';
import {Layout, Card, Switch, Table} from 'antd'
import './Clients.scss';
const Clients = () => {
  const [viewUserActives, setViewUserActives] = useState(true);
  const columns = [
    {
      title: 'DNI',
      dataIndex: 'DNI',
      key: 'DNI',
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
      title: 'Puntos',
      key: 'Puntos',
      dataIndex: 'Puntos'
    },
    {
      title: 'Estado',
      key: 'Estado',
      dataIndex: 'Estado'
    },
  ];
  const data = [];
  return (  
    <Layout className="list-users">
      <Card className="list-users__header">
        <h1 className="title-card">Lista de Clientes</h1>
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            onChange={() => setViewUserActives(!viewUserActives)}
          />
          <span>
            {viewUserActives ? "Usuarios Activos" : "Usuarios Inactivos"}
          </span>
        </div>
      </Card>

      <Card>
        <Table
          columns={columns}
          dataSource={data}
          scroll={{x: 380}}
        />
      </Card>

    </Layout>
  );
}
 
export default Clients;