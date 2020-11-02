import React from 'react'

import { Descriptions, Badge } from 'antd';

const List = () => {
  
    return (  
      <>
        <Descriptions title="User Info" layout="vertical" bordered  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            <Descriptions.Item label="Nombre comercial" span={2} size={"small"}>Cloud Database</Descriptions.Item>
            <Descriptions.Item label="Razon social" span={2}>Prepaid</Descriptions.Item>
            <Descriptions.Item label="Provincia">YES</Descriptions.Item>
            <Descriptions.Item label="Departamento">2018-04-24 18:00:00</Descriptions.Item>
            <Descriptions.Item label="Distrito" span={2}>
            2019-04-24 18:00:00
            </Descriptions.Item>
            <Descriptions.Item label="Dirección" span={4}>
            <Badge status="processing" text="Running" />
            </Descriptions.Item>
            <Descriptions.Item label="Acciones de empresa">
            Puede realizar estas acciones en caso desea actualizar la informacion adicional de su empresa
            <br />
            </Descriptions.Item>
        </Descriptions>
      </>
    );
}
export default List; 