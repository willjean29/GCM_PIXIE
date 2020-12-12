import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {Form, Input, Button} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {loginUserAction} from '../../../../../redux/actions/authActions';
import './Login.scss';
const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const authentication = useSelector(state => state.authentication.auth);
  const loginUser = (user) => dispatch(loginUserAction(user));

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Ingrese un email válido').required("El email es obligatorio"),
      password: Yup.string().required('El password es obligatorio')
    }),
    onSubmit: (formData) => loginUser(formData)
  });

  useEffect(() => {
    if(authentication){
      history.replace('/admin');
    }
    // eslint-disable-next-line
  }, [authentication])

  return (  
    <Form className="login-form" onChange={formik.handleChange} onFinish={formik.handleSubmit}>
      <Form.Item 
        hasFeedback 
        validateStatus={formik.errors.email ? "error" : "success"}
      >
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,0.25)"}}/>}
          type="text"
          name="email"
          value={formik.values.email}
          placeholder="Correo electronico"
          className="login-form__input"
        />
        <span style={{color : '#b83a38'}} className="msg-error">{formik.errors.email}</span>
      </Form.Item>
          
      <Form.Item hasFeedback validateStatus={formik.errors.password ? "error" : "success"}>
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,0.25)"}}/>}
          type="password"
          name="password"
          value={formik.values.password}
          placeholder="Contraseña"
          className="login-form__input"
        />
        <span style={{color : '#b83a38'}} className="msg-error">{formik.errors.password}</span>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form__button">
          Ingresar
        </Button>
      </Form.Item>
    </Form>
  );
}
 
export default LoginForm;