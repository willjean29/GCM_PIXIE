import React, {useState,useEffect} from 'react';
import { RedditOutlined, InfoCircleOutlined, CheckCircleOutlined} from '@ant-design/icons';
import { Card, Row, Col, Descriptions, Tabs, Image, Button } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment';
import {obtenerConcursoAction,activarConcursoAction} from '../../../../redux/actions/competitionActions';
import NoAvatar from '../../../../assets/img/png/no-avatar.png';
import Information from './components/Information';
import Actions from './components/Actions';
import Logo from './components/Logo';
import './InfoCompetition.scss';
const InfoCompetition = () => {
  const dispatch = useDispatch();
  const obtenerConcurso = () => dispatch(obtenerConcursoAction());
  const activarConcurso = (concurso) => dispatch(activarConcursoAction(concurso));
  const competition = useSelector(state => state.competition.data);
  const [reloadCompetition, setReloadCompetition] = useState(false);
  const { TabPane } = Tabs;
  useEffect(() => {
    obtenerConcurso();
    setReloadCompetition(false);
    // eslint-disable-next-line
  }, [dispatch,reloadCompetition])

  const handleActive = () => {
    console.log(competition._id);
    activarConcurso(competition);
  }
  return (
    <>
      <Card>
        <h1 className="title-card">Información del Concurso</h1>
      </Card>
      <Card>
        <Row gutter={24} className="info-competition">
          <Col span={24} md={8}
            style={{textAlign: 'center' }}
            className="info-competition__card"
          >
            <Card
              hoverable
              className="card"
              cover={
                <Image
                  width={200}
                  src={competition && (
                    competition.image ? competition.image : NoAvatar
                  )}
                  className="card__image"
                />
              }
            >
              <Card.Meta title={competition && competition.name} description="Concurso Simple" className="card__description"/>
              <Descriptions bordered column={1} className="card__content">
                <Descriptions.Item label="Fecha Inicio">
                  {
                    competition && moment.utc(competition.fechaInicio).format('L')
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Fecha Fin">
                {
                    competition && moment.utc(competition.fechaFin).format('L')
                  }
                </Descriptions.Item>
                <Descriptions.Item label="Estado">
                {
                    competition && (competition.estado ? "Activo" : "Inactivo")
                  }
                </Descriptions.Item>
              </Descriptions>
              <Button 
              type="primary" 
              style={{width: '100%'}} 
              className="btn-submit" 
              onClick={handleActive}
              disabled={competition && (
                competition.estado ? true : (
                  competition.active ? false : true
                )
              )}
              >Activar</Button>
            </Card>
          </Col>
          <Col span={24} md={16}
            className="info-competition__tabs"
          >
            <Tabs className="card-container">
              <TabPane tab={<span className="tab_text"><InfoCircleOutlined />Información</span>} key="1" >
                <Information competition={competition}/>
              </TabPane>
              <TabPane tab={<span className="tab_text"><CheckCircleOutlined />Acciones</span>} key="2" >
                <Actions competition={competition} />
              </TabPane>
              <TabPane tab={<span className="tab_text"><RedditOutlined />Logo</span>} key="3" >
                <Logo/>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default InfoCompetition;