import React from 'react';
import {FacebookOutlined, GlobalOutlined, WifiOutlined} from '@ant-design/icons';
import {Form, Col, Row, Button, Input, Card, Select, DatePicker} from 'antd';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import {actualizarAdminAction} from '../../../../../redux/actions/authActions';
import './EditProfile.scss';
const EditProfile = ({administrator}) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const actualizarAdmin = (dataAdmin) => dispatch(actualizarAdminAction(dataAdmin));
  const formik = useFormik({
    initialValues: {
      fechaNacimiento: moment.utc(administrator.fechaNacimiento),
      genero: administrator.genero ? administrator.genero : '',
      cargo: administrator.cargo ? administrator.cargo : '',
      direccion: administrator.direccion ? administrator.direccion : '',
      telefono: administrator.telefono ? administrator.telefono : '',
      celular: administrator.celular ? administrator.celular : '',
      departamento: administrator.departamento ? administrator.departamento : '',
      provincia: administrator.provincia ? administrator.provincia : '',
      distrito: administrator.distrito ? administrator.distrito : ''
    },
    validationSchema: Yup.object({
      genero: Yup.string().required("El género es obligatorio"),
      cargo: Yup.string().required("El cargo es obligatorio"),
      direccion: Yup.string().required("La dirección es obligatoria"),
      departamento: Yup.string().required("El departamento es obligatorio"),
      provincia: Yup.string().required("La provincia es obligatoria"),
      distrito: Yup.string().required("El distrito es obligatorio")
    }),
    onSubmit: (formData) => {
      const data = {
        ...formData,
        fechaNacimiento: moment(formData.fechaNacimiento).format("YYYY-MM-DD")
      }
      actualizarAdmin(data)
    }
  })
  return (  
    <>
      <Card
        type="inner"
        title="Llenar Formulario"
        className="card-edit-profile"
      >
        <Form
          layout="vertical"
          className="business-form"
          onChange={formik.handleChange}
          onFinish={formik.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Fecha de Nacimiento">
              <DatePicker
                name="fechaNacimiento"
                format="DD/MM/YYYY"
                defaultValue={formik.values.fechaNacimiento}
                onChange={(e,value) => {formik.values.fechaNacimiento = e}}
              />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Género"
                validateStatus={formik.errors.genero ? "error" : "success"}
              >
                <Select
                  showArrow
                  placeholder="Seleccionar Género"
                  onChange={(value) => formik.values.genero = value }
                  defaultValue={formik.values.genero}
                >
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Femenino">Femenino</Option>
                </Select>
                <span style={{color : '#ff4d4f'}}>{formik.errors.genero}</span>
              </Form.Item>
            </Col>
          </Row>
          
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Cargo de Ocupación"
                validateStatus={formik.errors.cargo ? "error" : "success"}              
              >
                <Input
                  type="text"
                  name="cargo"  
                  value={formik.values.cargo}
                />
                 <span style={{color : '#ff4d4f'}}>{formik.errors.cargo}</span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Dirección"
                validateStatus={formik.errors.direccion ? "error" : "success"}
              >
                <Input
                  type="text"
                  name="direccion"  
                  value={formik.values.direccion}
                />
                <span style={{color : '#ff4d4f'}}>{formik.errors.direccion}</span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Telefono">
                <Input
                  type="text"
                  name="telefono"
                  value={formik.values.telefono}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Celular">
                <Input
                  type="text"
                  name="celular"
                  value={formik.values.celular}
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={8}>
              <Form.Item label="Departamento"
                validateStatus={formik.errors.departamento ? "error" : "success"}
              >
                <Input
                  type="text"
                  name="departamento"
                  value={formik.values.departamento}
                />
                 <span style={{color : '#ff4d4f'}}>{formik.errors.departamento}</span>
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Provincia"
                validateStatus={formik.errors.provincia ? "error" : "success"}
              >
                <Input
                  type="text"
                  name="provincia"
                  value={formik.values.provincia}
                />
                 <span style={{color : '#ff4d4f'}}>{formik.errors.provincia}</span>
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item label="Distrito"
                validateStatus={formik.errors.distrito ? "error" : "success"}
              >
                <Input
                  type="text"
                  name="distrito"
                  value={formik.values.distrito}
                />
                 <span style={{color : '#ff4d4f'}}>{formik.errors.distrito}</span>
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
 
export default EditProfile;