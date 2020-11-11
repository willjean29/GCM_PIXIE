import React from 'react';
import {Card, Button, Image} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import Competition from '../../../../../../assets/img/svg/undraw_winners_ao2o.svg'
import './Actions.scss';
const Actions = () => {
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
    </Card>
  );
}
 
export default Actions;