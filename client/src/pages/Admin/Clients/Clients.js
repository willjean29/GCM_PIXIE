import React, {useState,useEffect} from 'react';
import {Layout, Card, Switch, Table, Tooltip, Spin} from 'antd';
import {DribbbleCircleFilled, SmileFilled} from '@ant-design/icons';
import {useDispatch,useSelector} from 'react-redux';
import {getClientsAction} from '../../../redux/actions/clientsAction';
import './Clients.scss';
const Clients = () => {
  const dispatch = useDispatch();
  const getClients = () => dispatch(getClientsAction());
  const clientesActivos = useSelector(state => state.clients.activeClients);
  const clientesInactivos = useSelector(state => state.clients.inactiveClients);
  const loading = useSelector(state => state.clients.loading);
  const [viewUserActives, setViewUserActives] = useState(true);
  const [reloadClients, setReloadClients] = useState(false);
  useEffect(() => {
    getClients();
    setReloadClients(false);
    // eslint-disable-next-line
  }, [dispatch,reloadClients])
  const columns = [
    {
      title: 'DNI',
      dataIndex: 'dni',
      key: 'dni',
    },
    {
      title: 'Nombres',
      key: 'name',
      dataIndex: 'name'
    },
    {
      title: 'Apellidos',
      key: 'lastName',
      dataIndex: 'lastName'
    },
    {
      title: 'Puntos',
      key: 'puntuacion',
      dataIndex: 'puntuacion',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.puntuacion - b.puntuacion,
      render: (puntos) => (
        <span><DribbbleCircleFilled /> {puntos}</span>
      )
    },
    {
      title: 'Estado',
      key: 'estado',
      dataIndex: 'estado',
      render: (estado) => (   
        <span>
          {estado ? (
            <Tooltip title="Cuenta activa">
              <SmileFilled style={{ color: "green"}} />
            </Tooltip>
          ) : (
            <Tooltip title="Cuenta Inactiva">
              <SmileFilled style={{ color: "red"}} />
            </Tooltip>
          )}
        </span>
      )
    },
  ];
  const data = viewUserActives ? clientesActivos : clientesInactivos;
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
        <Spin size="large" spinning={loading}>
          <Table 
            columns={columns} 
            dataSource={data} 
            scroll={{x: 380}}
          />
        </Spin>
      </Card>

    </Layout>
  );
}
 
export default Clients;