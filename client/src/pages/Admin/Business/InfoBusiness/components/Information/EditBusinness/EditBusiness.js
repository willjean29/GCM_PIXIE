import React from 'react';
import {FacebookOutlined, GlobalOutlined, WifiOutlined} from '@ant-design/icons';
import {Form, Col, Row, Button, Input, Card} from 'antd';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import {actualizarEmpresaAction} from '../../../../../../../redux/actions/businessActions';
import './EditBusiness.scss';
const EditBusiness = ({business}) => {
  const dispatch = useDispatch();
  const actualizarEmpresa = (data) => dispatch(actualizarEmpresaAction(data));
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
      facebook: business.redes.facebook ? business.redes.facebook : '',
      web: business.redes.web ? business.redes.web : '',
      red: business.redes.red ? business.redes.red : ''
    },
    onSubmit: (formData) => {
      const dataBusiness = {
        ...formData,
        ruc: business && business.ruc,
        razonSocial: business && business.razonSocial,
        nombreComercial: business && business.nombreComercial,
        direccion: business && business.direccion,
        estado: business && business.estado,
        tipo: business && business.tipo,
        departamento: business && business.departamento,
        provincia: business && business.provincia,
        distrito: business && business.distrito,
      }
      // registrarEmpresa(dataBusiness, next);
      actualizarEmpresa(dataBusiness);
    }
  })
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
          onFinish={formik.handleSubmit}
          onChange={formik.handleChange}
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Razon Social">
                <Input
                  type="text"
                  name="razonSocial"
                  value={business && business.razonSocial}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Nombre Comercial">
                <Input
                  type="text"
                  name="nombreComercial"
                  value={business && business.nombreComercial}
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
                  value={business && business.direccion}
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
                  value={business && business.estado}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Tipo">
                <Input
                  type="text"
                  name="tipo"
                  value={business && business.tipo}
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
                  value={business && business.departamento}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Provincia">
                <Input
                  type="text"
                  name="provincia"
                  value={business && business.provincia}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Distrito">
                <Input
                  type="text"
                  name="distrito"
                  value={business && business.distrito}
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