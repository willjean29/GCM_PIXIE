import React, { useState } from "react";
import { Steps, Card, Form, Input, Button, Row, Col, Divider } from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  MailOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  validarDniAction,
  registrarClientAction,
} from "../../../../../redux/actions/newAdminActions";
import "./RegisterForm.scss";

const RegisterForm = () => {
  const { Step } = Steps;
  const [current, setCurrent] = useState(0);
  const next = (data = true) => {
    if (!data) {
      return setCurrent(0);
    }
    setCurrent((value) => value + 1);
  };

  const prev = () => {
    setCurrent((value) => value - 1);
  };

  const steps = [
    {
      title: "DNI",
      content: <Step1 next={next} prev={prev} />,
    },
    {
      title: "Validar",
      content: <Step2 next={next} prev={prev} />,
    },
  ];

  return (
    <>
      <Card>
        <h1 className="title-card">Registrar Cliente</h1>
      </Card>
      <Card>
        <div className="new-admin-form">
          <Steps current={current} className="new-admin-form__steps">
            {steps.map((item) => (
              <Step
                key={item.title}
                title={item.title}
                className="steps-head"
              />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </div>
      </Card>
    </>
  );
};

const Step1 = ({ next, prev }) => {
  const dispatch = useDispatch();
  const validarDni = (dni, next) => dispatch(validarDniAction(dni, next));
  const formik = useFormik({
    initialValues: {
      dni: "",
    },
    validationSchema: Yup.object({
      dni: Yup.string()
        .required("El DNI es obligatorio")
        .min(8, "El DNI debe contener 8 caracteres")
        .max(8, "El DNI debe contener 8 caracteres"),
    }),
    onSubmit: (formData) => {
      validarDni(formData, next);
    },
  });
  return (
    <>
      <Card type="inner" title="Llenar Formulario">
        <Form
          className="token-admin-form"
          onChange={formik.handleChange}
          onFinish={formik.handleSubmit}
        >
          <Row gutter={10}>
            <Col span={24} md={16}>
              <Form.Item
                validateStatus={formik.errors.dni ? "error" : "success"}
              >
                <Input
                  addonBefore={<IdcardOutlined />}
                  placeholder="Ingresar DNI"
                  size="large"
                  name="dni"
                  type="text"
                  value={formik.values.dni}
                />
                <span style={{ color: "#b83a38" }} className="msg-error">
                  {formik.errors.dni}
                </span>
              </Form.Item>
            </Col>
            <Col span={24} md={4}>
              <Form.Item className="token-admin-form__submit">
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="btn-submit"
                >
                  Validar
                </Button>
              </Form.Item>
            </Col>
            <Col span={24} md={4}>
              <Form.Item className="token-admin-form__submit">
                <Button
                  htmlType="button"
                  size="large"
                  className="btn-submit"
                  onClick={prev}
                >
                  Volver
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Divider
        style={{
          margin: "40px 0 24px",
        }}
      />
      <div>
        <h4>Importante</h4>
        <p>
          Para comprobar la identidad del nuevo usuario, se validarán sus datos
          directamente con la RENIEC.
        </p>
      </div>
    </>
  );
};

const Step2 = ({ next, prev }) => {
  const dispatch = useDispatch();
  const registrarClient = (formData, next) =>
    dispatch(registrarClientAction(formData, next));
  const dataClient = useSelector((state) => state.newClient.dataClient);
  const formik = useFormik({
    initialValues: {
      dni: "",
      names: "",
      lastNameP: "",
      lastNameA: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Ingrese un email valido")
        .required("El email es obligatorio"),
      password: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("repeatPassword")], "Las contraseñas no son iguales")
        .min(6, "La contraseña debe tener minimo 6 caracteres"),
      repeatPassword: Yup.string()
        .required("La contraseña es obligatoria")
        .oneOf([Yup.ref("password")], "Las contraseñas no son iguales")
        .min(6, "La contraseña debe tener minimo 6 caracteres"),
    }),
    onSubmit: (formData) => {
      const formDataClient = {
        ...formData,
        dni: dataClient && dataClient.dni,
        names: dataClient && dataClient.nombres,
        lastNameP: dataClient && dataClient.apellidoPaterno,
        lastNameA: dataClient && dataClient.apellidoMaterno,
      };
      registrarClient(formDataClient, next);
    },
  });
  return (
    <>
      <Card type="inner" title="Llenar Formulario">
        <Form
          layout="vertical"
          className="token-admin-form"
          onChange={formik.handleChange}
          onFinish={formik.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item>
                <Input
                  addonBefore={<UserOutlined />}
                  placeholder="Nombres"
                  type="text"
                  name="names"
                  value={dataClient && dataClient.nombres}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item>
                <Input
                  addonBefore={<UserOutlined />}
                  placeholder="A. Paterno"
                  type="text"
                  name="lastNameP"
                  value={dataClient && dataClient.apellidoPaterno}
                  disabled
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item>
                <Input
                  addonBefore={<UserOutlined />}
                  placeholder="A. Materno"
                  type="text"
                  name="lastNameA"
                  value={dataClient && dataClient.apellidoMaterno}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                validateStatus={formik.errors.email ? "error" : "success"}
              >
                <Input
                  addonBefore={<MailOutlined />}
                  placeholder="Correo"
                  value={formik.values.email}
                  name="email"
                  type="text"
                />
                <span style={{ color: "#b83a38" }} className="msg-error">
                  {formik.errors.email}
                </span>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item
                validateStatus={formik.errors.password ? "error" : "success"}
              >
                <Input
                  addonBefore={<LockOutlined />}
                  placeholder="Contraseña"
                  type="password"
                  name="password"
                  value={formik.values.password}
                />
                <span style={{ color: "#b83a38" }} className="msg-error">
                  {formik.errors.password}
                </span>
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item
                validateStatus={
                  formik.errors.repeatPassword ? "error" : "success"
                }
              >
                <Input
                  addonBefore={<LockOutlined />}
                  placeholder="Repetir Contraseña"
                  type="password"
                  name="repeatPassword"
                  value={formik.values.repeatPassword}
                />
                <span style={{ color: "#b83a38" }} className="msg-error">
                  {formik.errors.repeatPassword}
                </span>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="token-admin-form__submit">
            <Row justify="end" gutter={[24, 12]}>
              <Col>
                <Button
                  htmlType="button"
                  className="btn-preview"
                  onClick={prev}
                >
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
};

export default RegisterForm;
