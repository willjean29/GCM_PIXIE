import React  from 'react';
import {Button, Modal}  from 'antd';
import {MenuUnfoldOutlined, PoweroffOutlined, MenuFoldOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {logoutUserAction} from '../../../redux/actions/authActions';
import Logo from '../../../assets/img/png/icon.png';
import './MenuTop.scss';
const MenuTop = (props) => {
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logoutUserAction());
  const {menuCollapsed, setMenuCollapsed} = props;
  const {confirm} = Modal;
  const cerrarSesion = () => {
    confirm({
      title: "Cerrar Sesión",
      content: `¿Estas seguro de abandonar la sesión?`,
      okText: 'Cerrar',
      okType: "danger",
      cancelText: 'Cancelar',
      onOk: () => logoutUser()
    })
  }
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
        <Button type="link" onClick={cerrarSesion}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
 
export default MenuTop;