import React from 'react';
import {FacebookOutlined, GlobalOutlined} from '@ant-design/icons';
import {Form, Col, Row, Button, Input, Card} from 'antd';
import './Step2.scss';
const Step2 = ({next, prev}) => {
  return (  
    <>
      <Card
        type="inner"
        title="Llenar Formulario"
        bordered
      >
        <Form
          layout="vertical"
          className="business-form"
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Razon Social">
                <Input
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Nombre Comercial">
                <Input
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Dirección">
                <Input/>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Estado">
                <Input
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Tipo">
                <Input
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={8}>
              <Form.Item label="Departamento">
                <Input
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Provincia">
                <Input
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Distrito">
                <Input
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Redes">
                <Input
                  prefix={<FacebookOutlined style={{ color: "rgba(0,0,0,0.25)"}}/>}
                  placeholder="Facebook"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input
                  prefix={<GlobalOutlined style={{ color: "rgba(0,0,0,0.25)"}}/>}
                  placeholder="Website"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input
                  prefix={<FacebookOutlined style={{ color: "rgba(0,0,0,0.25)"}}/>}
                  placeholder="Otra red"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="business-form__submit">
            <Row justify="end" gutter={[24,12]}>
              <Col>
                <Button htmlType="button" className="btn-preview" onClick={prev}>
                  Volver
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" className="btn-submit" onClick={next}>
                  Registrar
                </Button>
              </Col>
            </Row>

          </Form.Item>
          
        </Form>
      </Card>
    </>
  );
}
 
export default Step2;