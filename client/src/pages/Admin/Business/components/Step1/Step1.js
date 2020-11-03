import React from 'react';
import {Form, Button, Input, Card, Divider, Row, Col} from 'antd';
import './Step1.scss';
const Step1 = ({next}) => {
  return (  
    <>
      <Card type="inner" title="Llenar Formulario">
        <Form
          className="ruc-form"
        >
          <Row gutter={24}>
            <Col span={24} md={16}>
              <Form.Item
                label="RUC"
              >
                <Input/>
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item className="ruc-form__submit">
                <Button type="primary" htmlType="submit" className="btn-submit" onClick={next}>
                  Validar RUC
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

      </Card>
      <Divider
        style={{
          margin: '40px 0 24px',
        }}
      />
      <div>
        <h4>Importante</h4>
        <p>
          La validación de cada RUC se llevara a cabo con los servicios de la SUNAT, para  comprobar la formalidad de la empresa.
        </p>
      </div>
    </>
  );
}
 
export default Step1;