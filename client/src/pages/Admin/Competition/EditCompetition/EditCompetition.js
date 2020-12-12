import React from 'react';
import {Card, Row, Col, Form, Input, Button, Divider, DatePicker} from 'antd';
import {DollarOutlined, HeartOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import moment from 'moment';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {actualizarConcursoAction} from '../../../../redux/actions/competitionActions';
import './EditCompetition.scss';
const EditCompetition = ({competition}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const actualizarConcurso = (data) => dispatch(actualizarConcursoAction(data));
  const formik = useFormik({
    initialValues: {
      nombre:  competition && competition.name,
      soles:  "",
      puntos: competition && competition.reglas.puntos, 
      fechaInicio: moment(competition.fechaInicio),
      fechaFin: moment(competition.fechaFin) 
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
      console.log("entra actualizar")
      const dataCompetition = {
        ...formData,
        name: formData.nombre,
        /*puntos: formData.puntos,
        soles: competition && competition.reglas.parametro, */
        fechaFin: formData.fechaFin.format("YYYY-MM-DD"),
        fechaInicio: formData.fechaInicio.format("YYYY-MM-DD"),
        tipo: 'simple'
      }
      console.log(dataCompetition)
      actualizarConcurso(dataCompetition);
      history.replace('/admin/competition/info')
    }
  });
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }

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
                      value={formik.values.nombre}
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
                      value={formik.values.soles}
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
                      value={formik.values.puntos}
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
                      // onChange={(e,value) => {formik.values.fechaInicio=value}}
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
                      // onChange={(e,value) => {formik.values.fechaFin=value}}
                    />
                    <span style={{color : '#b83a38'}}>{formik.errors.fechaFin}</span>
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
 
export default EditCompetition;