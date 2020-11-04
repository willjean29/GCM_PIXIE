import React, {useState} from 'react';
import {UserOutlined, IdcardOutlined, MailOutlined, LockOutlined} from '@ant-design/icons';
import {Steps,Card,Form,Input,Button,Row,Col,Divider} from 'antd';
import './RegisterForm.scss';

const RegisterForm = () => {
  const {Step} = Steps;
  const [current, setCurrent] = useState(0);
  const next = (data=true) => {
    if(!data){
      return setCurrent(0);
    }
    setCurrent((value) => value + 1);
  }

  const prev = () => {
    setCurrent((value) => value - 1);
  }
  const steps = [
    {
      title: 'TOKEN',
      content: <Step1 next={next}/>,
    },
    {
      title: 'DNI',
      content: <Step2 next={next} prev={prev}/>,
    },
    {
      title: 'Validar',
      content: <Step3 next={next} prev={prev}/>
    }
  ];
  return (  
    <>
      <Card>
        <h1 className="title-card">Registrar Administrador</h1>
      </Card>
      <Card>
        <div className="new-admin-form">
          <Steps current={current} className="new-admin-form__steps">
            {steps.map(item => (
              <Step key={item.title} title={item.title} className="steps-head"/>
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </div>
      </Card>
    </>
  );
}

const Step1 = ({next}) => {
  return (
    <>
      <Card type="inner" title="Llenar Formulario">
        <Form
          className="token-admin-form"
        >
          <Row gutter={24}>
            <Col span={24} md={16}>
              <Form.Item
                size="large"
              >
                <Input
                  addonBefore={<UserOutlined />}
                  placeholder="Token WebMaster"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={8}>
              <Form.Item className="token-admin-form__submit">
                <Button type="primary" size="large" htmlType="submit" className="btn-submit" onClick={next}>
                  Validar
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
          Solo un miembro de PIXIE podra asignar una nueva cuenta asociada a una empresa.
        </p>
      </div>
    </>
  )
}

const Step2 = ({next, prev}) => {
  return (
    <>
      <Card type="inner" title="Llenar Formulario">
        <Form
          className="token-admin-form"
        >
          <Row gutter={10}>
            <Col span={24} md={16}>
              <Form.Item
              >
                <Input
                  addonBefore={<IdcardOutlined />}
                  placeholder="Ingresar DNI"
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={4}>
              <Form.Item className="token-admin-form__submit">
                <Button type="primary" size="large" htmlType="submit" className="btn-submit" onClick={next}>
                  Validar
                </Button>
              </Form.Item>
            </Col>
            <Col span={24} md={4}>
              <Form.Item className="token-admin-form__submit">
                <Button htmlType="button" size="large" className="btn-submit" onClick={prev}>
                  Volver
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
          Para comprobar la identidad del nuevo usuario, se validaran sus datos directamente con la RENIEC.
        </p>
      </div>
    </>
  )
}

const Step3 = ({next, prev}) => {
  return (
    <>
      <Card
        type="inner"
        title="Llenar Formulario"
      >
        <Form
          layout="vertical"
          className="token-admin-form"
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item>
                <Input
                  addonBefore={<UserOutlined />}
                  placeholder="Nombres"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item>
                <Input
                  addonBefore={<UserOutlined />}
                  placeholder="A. Paterno"
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
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item>
                <Input
                  addonBefore={<MailOutlined />}
                  placeholder="Correo"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item>
                <Input
                  addonBefore={<LockOutlined />}
                  placeholder="Contraseña"
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item>
                <Input
                  addonBefore={<LockOutlined />}
                  placeholder="Repetir Contraseña"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="token-admin-form__submit">
            <Row justify="end" gutter={[24,12]}>
              <Col>
                <Button htmlType="button" className="btn-preview" onClick={prev}>
                  Volver
                </Button>
              </Col>
              <Col>
                <Button type="primary" htmlType="submit" className="btn-submit" onClick={() => next(false)}>
                  Registrar
                </Button>
              </Col>
            </Row>

          </Form.Item>
          
        </Form>
      </Card>
    </>
  )
}
 
export default RegisterForm;
