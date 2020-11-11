import React from 'react';
import {FacebookOutlined, GlobalOutlined, WifiOutlined} from '@ant-design/icons';
import {Form, Col, Row, Button, Input, Card} from 'antd';
import './EditBusiness.scss';
const EditBusiness = () => {
  return (  
    <>
      <Card
        type="inner"
        title="Llenar Formulario"
        className="card-edit-business"
      >
        <Form
          layout="vertical"
          className="business-form-edit"
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Razon Social">
                <Input
                  type="text"
                  name="razonSocial"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Nombre Comercial">
                <Input
                  type="text"
                  name="nombreComercial"
                />
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Dirección">
                <Input
                  type="text"
                  name="direccion"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Estado">
                <Input
                  type="estado"
                  name="nombreComercial"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Tipo">
                <Input
                  type="text"
                  name="tipo"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={8}>
              <Form.Item label="Departamento">
                <Input
                  type="text"
                  name="departamento"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Provincia">
                <Input
                  type="text"
                  name="provincia"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Distrito">
                <Input
                  type="text"
                  name="distrito"
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
                  type="url"
                  name="facebook"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input
                  prefix={<GlobalOutlined style={{ color: "rgba(0,0,0,0.25)"}}/>}
                  placeholder="Website"
                  type="url"
                  name="web"
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Input
                  prefix={<WifiOutlined style={{ color: "rgba(0,0,0,0.25)"}}/>}
                  placeholder="Otra red"
                  type="url"
                  name="red"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="business-form__submit">
            <Row justify="end" gutter={[24,12]}>
              <Col>
                <Button type="primary" htmlType="submit" className="btn-submit">
                  Actualizar
                </Button>
              </Col>
            </Row>

          </Form.Item>
          
        </Form>
      </Card>
    </>
  );
}
 
export default EditBusiness;