import React from 'react';
import {Card, Row, Col, Form, Input, Button, Divider} from 'antd';
import {CalendarOutlined, DollarOutlined, HeartOutlined} from '@ant-design/icons';
import './NewCompetition.scss';
const NewCompetition = () => {
  return (  
    <>
      <Card>
        <h1 className="title-card">Crear Concurso</h1>
      </Card>
      <Card>
        <div className="competition-new-form">
          <Card
            type="inner"
            title="Llenar Formulario"
          >
            <Form
              layout="vertical"
              className="competition-new-form__register"
            >
              
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="Nombre del Concurso">
                    <Input
                      type="text"
                      name="nombre"
                      size="large"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Reglas del Concurso" style={{margin: '0'}}>
                <Divider style={{margin: '0'}}/>
              </Form.Item>

              <Row gutter={24}>
                <Col span={24} md={12}>
                  <Form.Item label="Nuevos Soles">
                    <Input
                      type="estado"
                      name="soles"
                      size="large"
                      addonBefore={<DollarOutlined />}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item label="Puntos">
                    <Input
                      type="text"
                      name="puntos"
                      size="large"
                      addonBefore={<HeartOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Duración" style={{margin: '0'}}>
                <Divider style={{margin: '0'}}/>
              </Form.Item>

              <Row gutter={24}>
                <Col span={24} md={12}>
                  <Form.Item label="Fecha Inicio">
                    <Input
                      type="estado"
                      name="fechaInicio"
                      size="large"
                      addonBefore={<CalendarOutlined />}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} md={12}>
                  <Form.Item label="Fecha Final">
                    <Input
                      type="text"
                      name="fechaFin"
                      size="large"
                      addonBefore={<CalendarOutlined />}
                    />
                  </Form.Item>
                </Col>
              </Row>


              <Form.Item className="submit">
                <Row justify="end" gutter={[24,12]}>
                  <Col>
                    <Button type="primary" htmlType="submit" className="btn-submit" size="large">
                      Registrar
                    </Button>
                  </Col>
                </Row>

              </Form.Item>
              
            </Form>
          </Card>
        </div>
      </Card>
    </>

  );
}
 
export default NewCompetition;