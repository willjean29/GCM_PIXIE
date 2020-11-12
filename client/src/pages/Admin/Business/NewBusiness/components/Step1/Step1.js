import React from 'react';
import {BarcodeOutlined} from '@ant-design/icons';
import {Form, Button, Input, Card, Divider, Row, Col} from 'antd';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './Step1.scss';
const Step1 = ({next}) => {
  const formik = useFormik({
    initialValues: {
      ruc: ''
    },
    validationSchema: Yup.object({
      /*eslint dot-location: ["error", "object"]*/
      ruc: Yup.string().required("El RUC es obligatorio").
        min(11,"El RUC debe contener 11 caracteres").
        max(11,"El RUC debe contener 11 caracteres")
    }),
    onSubmit: (formData) => next()
  })
  return (  
    <>
      <Card type="inner" title="Llenar Formulario">
        <Form
          className="ruc-form"
          onChange={formik.handleChange}
          onFinish={formik.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={24} md={16}>
              <Form.Item
                validateStatus={formik.errors.ruc ? "error" : "success"}
              >
                <Input
                  size="large"
                  addonBefore={<BarcodeOutlined />}
                  placeholder="Ingrese RUC"
                  name="ruc"
                  type="text"
                  value={formik.values.ruc}
                />
                <span style={{color : '#b83a38'}} className="msg-error">{formik.errors.ruc}</span>
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item className="ruc-form__submit">
                <Button type="primary" htmlType="submit" className="btn-submit" size="large">
                  Validar RUC
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>

      </Card>
      <Divider
        style={{
          margin: '40px 0 24px'
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