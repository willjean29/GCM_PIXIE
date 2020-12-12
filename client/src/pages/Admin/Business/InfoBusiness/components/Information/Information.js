import React, {useState} from 'react';
import {EditOutlined,DeleteOutlined} from '@ant-design/icons';
import {Card, Table, Button} from 'antd';
import EditBusiness from './EditBusinness';
import Modal from '../../../../../../components/Admin/Modal';
import './Information.scss';
const Information = ({business}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [contentModal, setContentModal] = useState(null);
  const handlerEditBusiness = () => {
    setModalTitle("Editar Empresa");
    setContentModal(
      <EditBusiness business={business}/>
    )
    setShowModal(true);
  }
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
      dato: 'Nombre Comercial',
      caracteristica: business && business.nombreComercial
    },
    {
      key: '2',
      dato: 'Razón Social',
      caracteristica: business && business.razonSocial
    },
    {
      key: '3',
      dato: 'Provincia',
      caracteristica: business && business.provincia
    },
    {
      key: '4',
      dato: 'Departamento',
      caracteristica: business && business.departamento
    },
    {
      key: '5',
      dato: 'Distrito',
      caracteristica: business && business.distrito
    },
    {
      key: '6',
      dato: 'Dirección',
      caracteristica: business && business.direccion
    },
  ]
  return (  
    <Card hoverable>
      <Table 
        columns={columns} 
        dataSource={data}
        pagination={false}
        bordered
        className="table-competition"
      />
      <div className="options-competition">
        <h2>Acciones de Empresa</h2>
        <p>Puede realizar estas acciones en caso desee actualizar la información actual de su empresa.</p>
        <div
          className="options-competition__actions"
        >
          <Button
            type="primary"
            onClick={handlerEditBusiness}
          >
            <EditOutlined />
            Editar
          </Button>
          <Button
            type="primary"
            danger
          >
            <DeleteOutlined />
            Eliminar
          </Button>
        </div>
      </div>
      <Modal title={modalTitle} isVisible={showModal} setIsVisible={setShowModal}>
        {contentModal}
      </Modal>
    </Card>
  );
}
 
export default Information;