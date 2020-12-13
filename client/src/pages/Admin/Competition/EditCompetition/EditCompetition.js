import React from 'react';
import {Card, Row, Col, Form, Input, Button, Divider, DatePicker} from 'antd';
import {DollarOutlined, HeartOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {modificarConcursoAction} from '../../../../redux/actions/competitionActions';
import './EditCompetition.scss';
const EditCompetiton = ({competition,setShowModal}) => {
  const dispatch = useDispatch();
  const modificarConcurso = (data) => dispatch(modificarConcursoAction(data));
  const formik = useFormik({
    initialValues: {
      nombre: competition.name ? competition.name : '',
      soles: competition.reglas ? competition.reglas.parametro : '',
      puntos: competition.reglas ? competition.reglas.puntos : '',
      fechaInicio: moment.utc(competition.fechaInicio),
      fechaFin: moment.utc(competition.fechaFin)
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required('El nombre es obligatorio'),
      soles: Yup.number('Ingrese un número valido').required('La cantidad en soles es obligatoria')
        .min(1,'Ingrese una cantida valida'),
      puntos: Yup.number('Ingrese un número valido').required('La cantidad de puntos es obligatoria')
        .min(1,'Ingrese una cantida valida'),
      fechaInicio: Yup.date().required("Las fechas son obligatorias"),
      fechaFin: Yup.date().required("Las fechas son obligatorias"),
    }),
    onSubmit: (formData) => {
      const dataCompetition = {
        ...formData,
        name: formData.nombre,
        fechaFin: formData.fechaFin.format("YYYY-MM-DD"),
        fechaInicio: formData.fechaInicio.format("YYYY-MM-DD"),
        tipo: 'simple'
      }
      console.log(dataCompetition);
      modificarConcurso(dataCompetition);
      setShowModal(false);
    }
  });
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  return (  
    <>
      <div className="competition-edit-form">
        <Card
          type="inner"
          title="Llenar Formulario"
        >
          <Form
            layout="vertical"
            className="competition-edit-form__register"
            onChange={formik.handleChange}
            onFinish={formik.handleSubmit}
          >
            
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Nombre del Concurso"
                  validateStatus={formik.errors.nombre ? 'error' : 'success'}
                >
                  <Input
                    type="text"
                    name="nombre"
                    size="large"
                    defaultValue={formik.values.nombre}
                  />
                    <span style={{color : '#b83a38'}}>{formik.errors.nombre}</span>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Reglas del Concurso" style={{margin: '0'}}>
              <Divider style={{margin: '0'}}/>
            </Form.Item>

            <Row gutter={24}>
              <Col span={24} md={12}>
                <Form.Item label="Nuevos Soles"
                  validateStatus={formik.errors.soles ? 'error' : 'success'}
                >
                  <Input
                    type="number"
                    min={1}
                    name="soles"
                    size="large"
                    addonBefore={<DollarOutlined />}
                    defaultValue={formik.values.soles}
                  />
                  <span style={{color : '#b83a38'}}>{formik.errors.soles}</span>
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item label="Puntos"
                  validateStatus={formik.errors.puntos ? 'error' : 'success'}
                >
                  <Input
                    type="number"
                    min={1}
                    name="puntos"
                    size="large"
                    addonBefore={<HeartOutlined />}
                    defaultValue={formik.values.puntos}
                  />
                  <span style={{color : '#b83a38'}}>{formik.errors.puntos}</span>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Duración" style={{margin: '0'}}>
              <Divider style={{margin: '0'}}/>
            </Form.Item>

            <Row gutter={24}>
              <Col span={24} md={12}>
                <Form.Item label="Fecha Inicio"
                  validateStatus={formik.errors.fechaInicio ? 'error' : 'success'}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    size="large"
                    name="fechaInicio"
                    format="DD/MM/YYYY"
                    defaultValue={formik.values.fechaInicio}
                    onChange={(e,value) => {formik.values.fechaInicio = e}}
                  />
                  <span style={{color : '#b83a38'}}>{formik.errors.fechaInicio}</span>
                </Form.Item>
              </Col>
              <Col span={24} md={12}>
                <Form.Item label="Fecha Final"
                  validateStatus={formik.errors.fechaFin ? 'error' : 'success'}
                >
                  <DatePicker
                    disabledDate={disabledDate}
                    size="large"
                    name="fechaFin"
                    format="DD/MM/YYYY"
                    defaultValue={formik.values.fechaFin}
                    onChange={(e,value) => {formik.values.fechaFin = e}}
                  />
                  <span style={{color : '#b83a38'}}>{formik.errors.fechaFin}</span>
                </Form.Item>
              </Col>
            </Row>


            <Form.Item className="submit">
              <Row justify="end" gutter={[24,12]}>
                <Col>
                  <Button type="primary" htmlType="submit" className="btn-submit" size="large">
                    Actualizar
                  </Button>
                </Col>
              </Row>

            </Form.Item>
            
          </Form>
        </Card>
      </div>
    </>
  );
}
 
export default EditCompetiton;