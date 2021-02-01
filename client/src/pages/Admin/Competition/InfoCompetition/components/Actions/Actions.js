import React, { useState } from "react";
import { Card, Button, Image, Modal as ModalAnt } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Modal from "../../../../../../components/Admin/Modal";
import EditCompetiton from "../../../EditCompetition";
import Competition from "../../../../../../assets/img/svg/undraw_winners_ao2o.svg";
import "./Actions.scss";
import { eliminarConcursoAction } from "../../../../../../redux/actions/competitionActions";
import { useDispatch } from "react-redux";

const Actions = ({ competition }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [contentModal, setContentModal] = useState(null);
  const dispatch = useDispatch();
  const eliminarConcursoID = (premio) =>
    dispatch(eliminarConcursoAction(premio));
  // const [reloadFiles, setReloadFiles] = useState(false);
  const { confirm } = ModalAnt;
  const eliminarConcurso = (competition) => {
    confirm({
      title: "Eliminar concurso",
      content: "Un concurso eliminado no se puede recuperar",
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk: () => {
        eliminarConcursoID(competition);
      },
    });
  };

  const handleModal = () => {
    setModalTitle("Editar Concurso");
    setContentModal(
      <EditCompetiton competition={competition} setShowModal={setShowModal} />
    );
    setShowModal(true);
  };
  return (
    <Card className="card-competition">
      <h2>Acciones del Concurso</h2>
      <p>
        Puede realizar estas acciones solo cuando el concurso no este activo o
        haya caducado.
      </p>
      <div className="card-competition__actions">
        <Button
          type="primary"
          onClick={handleModal}
          disabled={competition && competition.estado ? true : false}
        >
          <EditOutlined />
          Editar
        </Button>
        <Button
          type="primary"
          danger
          disabled={competition && competition.estado ? true : false}
        >
          <DeleteOutlined /> onClick={() => eliminarConcurso(competition)}
          Eliminar
        </Button>
      </div>
      <Image src={Competition} />
      <Modal
        title={modalTitle}
        isVisible={showModal}
        setIsVisible={setShowModal}
      >
        {contentModal}
      </Modal>
    </Card>
  );
};

export default Actions;
