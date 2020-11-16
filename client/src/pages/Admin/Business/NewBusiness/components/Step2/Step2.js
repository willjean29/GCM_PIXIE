import React from 'react';
import {FacebookOutlined, GlobalOutlined, WifiOutlined} from '@ant-design/icons';
import {Form, Col, Row, Button, Input, Card} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import {registrarEmpresaAction} from '../../../../../../redux/actions/newBusinessActions';
import './Step2.scss';
const Step2 = ({next, prev, setReloadUser}) => {
  const dispatch = useDispatch();
  const businessData = useSelector(state => state.newBusiness.business);
  const registrarEmpresa = (data,next,setReloadUser) => dispatch(registrarEmpresaAction(data,next,setReloadUser));
  const formik = useFormik({
    initialValues: {
      ruc: '',
      razonSocial: '',
      nombreComercial: '',
      direccion: '',
      estado: '',
      tipo: '',
      departamento: '',
      provincia: '',
      distrito: '',
      facebook: '',
      web: '',
      red: ''
    },
    onSubmit: (formData) => {
      const dataBusiness = {
        ...formData,
        ruc: businessData && businessData.ruc,
        razonSocial: businessData && businessData.razonSocial,
        nombreComercial: businessData && businessData.nombreComercial,
        direccion: businessData && businessData.direccion,
        estado: businessData && businessData.estado,
        tipo: businessData && businessData.tipo,
        departamento: businessData && businessData.departamento,
        provincia: businessData && businessData.provincia,
        distrito: businessData && businessData.distrito,
      }
      registrarEmpresa(dataBusiness, next,setReloadUser);
    }
  })
  return (  
    <>
      <Card
        type="inner"
        title="Llenar Formulario"
      >
        <Form
          layout="vertical"
          className="business-form"
          onFinish={formik.handleSubmit}
          onChange={formik.handleChange}
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Razon Social">
                <Input
                  type="text"
                  name="razonSocial"
                  value={businessData && businessData.razonSocial}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Nombre Comercial">
                <Input
                  type="text"
                  name="nombreComercial"
                  value={businessData && businessData.nombreComercial}
                  disabled
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
                  value={businessData && businessData.direccion}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Estado">
                <Input
                  type="text"
                  name="estado"
                  value={businessData && businessData.estado}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Tipo">
                <Input
                  type="text"
                  name="tipo"
                  value={businessData && businessData.tipo}
                  disabled
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
                  value={businessData && businessData.departamento}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Provincia">
                <Input
                  type="text"
                  name="provincia"
                  value={businessData && businessData.provincia}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Distrito">
                <Input
                  type="text"
                  name="distrito"
                  value={businessData && businessData.distrito}
                  disabled
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
                  value={formik.values.facebook}
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
                  value={formik.values.web}
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
                  value={formik.values.red}
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
                <Button type="primary" htmlType="submit" className="btn-submit">
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