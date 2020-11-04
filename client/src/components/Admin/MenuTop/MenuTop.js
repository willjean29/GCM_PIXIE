import React from 'react';
import {Button} from 'antd';
import {MenuUnfoldOutlined, PoweroffOutlined, MenuFoldOutlined} from '@ant-design/icons';
import Logo from '../../../assets/img/png/icon.png';
import './MenuTop.scss';
const MenuTop = (props) => {
  const {menuCollapsed, setMenuCollapsed} = props;
  return (  
    <div className="menu-top">
      <div className="menu-top__left">
        <img 
          src={Logo}
          alt="PIXIE - Sistema de Incentivos a las ventas" 
          className="menu-top__left-logo"
        />
        <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed) }>
          {
            (menuCollapsed) ? <MenuUnfoldOutlined/>  : <MenuFoldOutlined />
          }
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link">
          <PoweroffOutlined />
        </Button>
      </div>
    </div>

  );
}
 
export default MenuTop;