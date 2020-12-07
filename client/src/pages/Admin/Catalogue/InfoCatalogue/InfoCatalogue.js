import React, {useState,useEffect} from 'react';
import {Card, Table, Space, Tooltip, Button, Avatar, Modal as ModalAnt, Spin} from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useSelector,useDispatch} from 'react-redux';
import {obtenerPremiosAction, eliminarPremioAction} from '../../../../redux/actions/catalogActions';
const InfoCatalogue = () => {
  const {confirm} = ModalAnt;
  const [reloadPrizes, setReloadPrizes] = useState(false);
  const dispatch = useDispatch();
  const obtenerPremios = () => dispatch(obtenerPremiosAction());
  const eliminarPremioID = (premio) => dispatch(eliminarPremioAction(premio));
  const premios = useSelector(state => state.catalog.prizes);
  useEffect(() => {
    obtenerPremios();
    setReloadPrizes(false);
  }, [dispatch,reloadPrizes])
  const eliminarPremio = (prize) => {
    confirm({
      title: "Eliminar premio",
      content: "Un premio eliminado no se puede recuperar",
      okText: 'Eliminar',
      okType: "danger",
      cancelText: 'Cancelar',
      onOk: () => {
        console.log("Eliminar ", prize._id);
        eliminarPremioID(prize);
        setReloadPrizes(true);
      }
    })
  }
  const columns = [
    {
      title: 'IMG',
      dataIndex: 'url',
      key: 'url',
      render: (url) => (
        <Avatar
          src={url}
        />
      )
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
      key: 'category',
      render: (categoria) => (categoria.name)
    },
    {
      title: 'Acciones',
      key: '_id',
      render: (prize) => (
        <Space size='middle'>
          <Tooltip title="Editar Premio">
            <Button type='primary' icon={<EditOutlined />} >
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar Premio">
            <Button type='primary' danger icon={<DeleteOutlined />} onClick={() => eliminarPremio(prize)}>
            </Button>
          </Tooltip>
        </Space>
      )
    }
  ]
  const data = premios;
  return (  
    <>
      <Card>
          <h1 className="title-card">Lista de premios en el catalogo</h1>
      </Card>
      <Card>
        <Spin size="large" spinning={premios ? false : true}>
          <Table
            columns={columns}
            dataSource={data}
          />
        </Spin>
      </Card>
    </>
  );
}
 
export default InfoCatalogue;