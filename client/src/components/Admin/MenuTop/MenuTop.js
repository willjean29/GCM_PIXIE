import React , {useEffect} from 'react';
import {Button, Modal}  from 'antd';
import {MenuUnfoldOutlined, PoweroffOutlined, MenuFoldOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {logoutUserAction} from '../../../redux/actions/authActions';
import Logo from '../../../assets/img/png/icon.png';
import './MenuTop.scss';
const MenuTop = (props) => {
  const dispatch = useDispatch();
  const logoutUser = () => dispatch(logoutUserAction());
  const {menuCollapsed, setMenuCollapsed, setVisible} = props;
  const {confirm} = Modal;
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const cerrarSesion = () => {
    confirm({
      title: "Cerrar Sesión",
      content: `¿Estas seguro de abandonar la sesión?`,
      okText: 'Cerrar',
      okType: "danger",
      cancelText: 'Cancelar',
      onOk: () => {
        logoutUser();
      }
    })
  }
  useEffect(() => {
    isTabletOrMobile && setMenuCollapsed(true) 
    // eslint-disable-next-line
  }, [isTabletOrMobile])
  return (  
    <div className="menu-top">
      <div className="menu-top__left">
        <img 
          src={Logo}
          alt="PIXIE - Sistema de Incentivos a las ventas" 
          className="menu-top__left-logo"
        />
        <Button type="link" onClick={() => isTabletOrMobile ? setVisible(true) :setMenuCollapsed(!menuCollapsed) }>
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