import React, {useState} from 'react';
import {Card, Button, Image} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import Modal from '../../../../../../components/Admin/Modal';
import EditCompetiton from '../../../EditCompetition';
import Competition from '../../../../../../assets/img/svg/undraw_winners_ao2o.svg';
import './Actions.scss';
const Actions = ({competition}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [contentModal, setContentModal] = useState(null);
  // const [reloadFiles, setReloadFiles] = useState(false);
  const handleModal = () => {
    setModalTitle("Editar Concurso");
    setContentModal(
      <EditCompetiton 
        competition={competition} 
        setShowModal={setShowModal} 
      />
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
          onClick={handleModal}
          disabled={competition && competition.estado ? true: false}
        >
          <EditOutlined />
          Editar
        </Button>
        <Button
          type="primary"
          danger
          disabled={competition && competition.estado ? true: false}
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