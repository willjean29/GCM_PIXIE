
import React from 'react'
import { Card, Descriptions, Badge} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import Logo from '../../../../assets/img/png/no-avatar.png'

const CardBusiness = () =>{

    return(
        <>
        <Card
        style={{ width: 300}}
        cover={
          <img
            alt="example"
            src={Logo}
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Descriptions className="labelL" title="Nombre de Empresa"  layout="horizontal" bordered  column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            <Descriptions.Item className="labelL__card" label="RUC" span={4}>20421239275</Descriptions.Item>
            <Descriptions.Item className="labelL__card" label="Clientes" span={4}>0</Descriptions.Item>
            <Descriptions.Item className="labelL__card" label="Estado">
                <Badge status="processing" text="ACTIVO" />
            </Descriptions.Item>
        </Descriptions>
      </Card>
        </>
    );
}

export default CardBusiness; 