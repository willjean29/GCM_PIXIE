import React, {useState} from 'react';
import {Card, Button, Image} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import Competition from '../../../../../../assets/img/svg/undraw_winners_ao2o.svg'
import Modal from '../../../../../../components/Admin/Modal';
import './Actions.scss';
import EditCompetition from '../../../EditCompetition';
const Actions = ({competition}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [contentModal, setContentModal] = useState(null);
  const handlerEditCompetition = () => {
    setModalTitle("Editar Concurso"); 
    setContentModal( 
      <EditCompetition competition={competition}/> 
    )
    setShowModal(true);
  }
  return ( 
    <Card
      className="card-competition"
    >
      <h2>Acciones del Concurso</h2>
      <p>Puede realizar estas acciones solo cuando el concurso no este activo o haya caducado.</p>
      <div
        className="card-competition__actions"
      >
        <Button
          type="primary"
          onClick={handlerEditCompetition}//si esta activo
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
      <Image
        src={Competition}
      />
      <Modal title={modalTitle} isVisible={showModal} setIsVisible={setShowModal}>
        {contentModal}
      </Modal>
    </Card>
  );
}
 
export default Actions;