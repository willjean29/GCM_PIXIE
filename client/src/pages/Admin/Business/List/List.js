import React from 'react'

import { Descriptions, Button } from 'antd';
import { EditOutlined, DeleteOutlined} from '@ant-design/icons';

import './List.scss';
const List = () => {
  
    return (  
      <>
        <Descriptions layout="vertical" bordered  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            <Descriptions.Item className="labelL" label={"RAZON SOCIAL"} span={2}>UNIVERSIDAD CIENTIFICA DEL SUR S.A.C.</Descriptions.Item>
            <Descriptions.Item className="labelL" label="NOMBRE COMERCIAL" span={2}>UNIVERSIDAD CIENTIFICA DEL SUR S.A.C.</Descriptions.Item>
            <Descriptions.Item className="labelL" label="PROVINCIA">LIMA</Descriptions.Item>
            <Descriptions.Item className="labelL" label="DEPARTAMENTO">LIMA</Descriptions.Item>
            <Descriptions.Item className="labelL" label="DISTRITO" span={2}>VILLA EL SALVADOR</Descriptions.Item>
            <Descriptions.Item className="labelL" label="DIRECCIÓN" span={4}>CAR.ANTIGUA PANAMERICANA </Descriptions.Item>
        </Descriptions>

          <h3 className="text">Acciones de empresa</h3>
          <p className="text">Puede realizar estas acciones en caso desea actualizar la informacion adicional de su empresa</p>
            <Button className="btn_edit" icon={<EditOutlined/>}>Editar</Button>
            <Button type="primary" className="btn_danger" icon={<DeleteOutlined />} danger>Eliminar</Button>
      </>
    );
}
export default List; 