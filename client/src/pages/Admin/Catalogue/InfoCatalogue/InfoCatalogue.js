import React, {useEffect} from 'react';
import {Card, Table, Space, Tooltip, Button, Avatar} from 'antd';
import { DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useSelector,useDispatch} from 'react-redux';
import {obtenerPremiosAction} from '../../../../redux/actions/catalogActions';
const InfoCatalogue = () => {
  const dispatch = useDispatch();
  const obtenerPremios = () => dispatch(obtenerPremiosAction());
  const premios = useSelector(state => state.catalog.prizes);
  useEffect(() => {
    obtenerPremios();
  }, [])
  const eliminarPremio = (id) => {
    console.log("eliminar premio ", id);
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
      render: (id) => (
        <Space size='middle'>
          <Tooltip title="Editar Premio">
            <Button type='primary' icon={<EditOutlined />} >
            </Button>
          </Tooltip>
          <Tooltip title="Eliminar Premio">
            <Button type='primary' danger icon={<DeleteOutlined />} onClick={() => eliminarPremio(id)}>
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
        <Table
          columns={columns}
          dataSource={data}
        />
      </Card>
    </>
  );
}
 
export default InfoCatalogue;