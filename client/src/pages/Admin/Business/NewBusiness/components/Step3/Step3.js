import React, {useEffect} from 'react';
import {Result, Button} from 'antd';
import {useHistory} from 'react-router-dom';
import './Step3.scss';
const Step3 = () => {
  const history = useHistory();
  useEffect(() => {
    setTimeout(() => {
      history.replace('/admin/business/info');
    }, 1500);
    // eslint-disable-next-line
  }, [])
  return (  
    <Result
      status="success"
      title="!Empresa Registrada!"
      subTitle="Su empresa ha sido registrada, ahora podra acceder a todas las funcionalidades que PIXIE ofrece para usted."
      extra={[
        <Button type="primary" key="console">
          Ver Perfil
        </Button>,
        <Button key="buy">Home</Button>,
      ]}
    />
  )
}
 
export default Step3;