import React from 'react';
import {Result, Button} from 'antd';

import './Step3.scss';
const Step3 = () => {
  return (  
    <Result
      status="success"
      title="!Empres Registrada!"
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