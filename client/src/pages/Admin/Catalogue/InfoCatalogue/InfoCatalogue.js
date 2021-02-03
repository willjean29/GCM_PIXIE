import React, {useState,useEffect} from 'react';
import {Card, Table, Space, Tooltip, Button, Avatar, Modal as ModalAnt, Spin, Layout} from 'antd';
import { DeleteOutlined, EditOutlined, PlusCircleOutlined} from '@ant-design/icons';
import {useSelector,useDispatch} from 'react-redux';
import {
  obtenerPremiosAction, 
  eliminarPremioAction, 
  getCategoriesAction
} from '../../../../redux/actions/catalogActions';
import Modal from '../../../../components/Admin/Modal';
import NewCatalogue from '../NewCatalogue';
import ItemEdit from '../components/ItemEdit';
import './InfoCatalogue.scss';
const InfoCatalogue = () => {
  const {confirm} = ModalAnt;
  const {Content} = Layout;
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [contentModal, setContentModal] = useState(null);
  const [reloadPrizes, setReloadPrizes] = useState(false);
  const dispatch = useDispatch();
  const obtenerPremios = () => dispatch(obtenerPremiosAction());
  const eliminarPremioID = (premio) => dispatch(eliminarPremioAction(premio));
  const getCategories = () => dispatch(getCategoriesAction());
  const categories = useSelector(state => state.catalog.categories);
  const premios = useSelector(state => state.catalog.prizes);
  useEffect(() => {
    obtenerPremios();
    setReloadPrizes(false);
  }, [dispatch,reloadPrizes])

  useEffect(() => {
    getCategories();
  }, [])

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
  const handleAddPrize = () => {
    setModalTitle('Agregar Premio');
    setContentModal(
      <NewCatalogue 
        setShowModal={setShowModal} 
        categories={categories} 
        setContentModal={setContentModal}
        setReloadPrizes={setReloadPrizes}
      />
    )
    setShowModal(true);
  }
  const handleEditPrize = (prize) => {
    setModalTitle('Editar Premio');
    setContentModal(
      <ItemEdit prize={prize} 
        categories={categories} 
        setReloadPrizes={setReloadPrizes} 
        setShowModal={setShowModal}
      />
    )
    setShowModal(true);
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
            <Button type='primary' icon={<EditOutlined />} onClick={() => handleEditPrize(prize)}>
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
    <Layout className="list-prizes">
      <Card className="list-prizes__title">
          <h1 className="title-card">Lista de Premios</h1>
      </Card>
      <Content className="list-prizes__buttons">
        <Space size='middle'>
          <Tooltip placement='top' title="Agregar premios al catálago">
            <Button icon={<PlusCircleOutlined />} type='primary' onClick={handleAddPrize}>
              Agregar Premios
            </Button>
          </Tooltip>
        </Space>
      </Content>
      <Card className="list-prizes__content">
        <Spin size="large" spinning={premios ? false : true}>
          <Table
            columns={columns}
            dataSource={data}
            scroll={{x: 380}}
          />
        </Spin>
      </Card>
      <Modal title={modalTitle} isVisible={showModal} setIsVisible={setShowModal}>
        {contentModal}
      </Modal>
    </Layout>
  );
}
 
export default InfoCatalogue;