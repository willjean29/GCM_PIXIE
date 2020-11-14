import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Layout, Menu, Tooltip} from 'antd';
import {
  HomeOutlined, 
  UserOutlined, 
  FileExcelOutlined, 
  BankOutlined, 
  AimOutlined, 
  CarryOutOutlined
} from '@ant-design/icons';

import './MenuSider.scss';
const MenuSider = (props) => {
  const {menuCollapsed} = props;
  const {location:{pathname}} = useHistory();
  const {SubMenu} = Menu;
  const {Sider} = Layout;
  const administrador = useSelector(state => state.authentication.user);

  return (  
    <Sider className="admin-sider" collapsed={menuCollapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
        <Menu.Item key="/admin">
          <Link to="/admin">
            <HomeOutlined />
            <span className="nav-text">Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/admin/profile">
          <Link to="/admin/profile">
            <UserOutlined />
            <span className="nav-text">Perfil</span>
          </Link>
        </Menu.Item>
        <SubMenu icon={<BankOutlined />} title="Empresa">
          {
            administrador && administrador.estado ? (
              <Menu.Item key="/admin/business/info">
                <Link to="/admin/business/info">
                  <CarryOutOutlined />
                  <span className="nav-text">Información</span>
                </Link>
              </Menu.Item>
            ) : (
              <Menu.Item key="/admin/business/new">
                <Link to="/admin/business/new">
                  <CarryOutOutlined />
                  <span className="nav-text">Registrar</span>
                </Link>
              </Menu.Item>
            )
          }
        </SubMenu>
        {
          administrador && administrador.estado ? (
            <SubMenu icon={<AimOutlined />} title="Concursos">
              <Menu.Item key="/admin/competition/new">
                <Link to="/admin/competition/new">
                  <CarryOutOutlined />
                  <span className="nav-text">Registrar</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/admin/competition/info">
                <Link to="/admin/competition/info">
                  <CarryOutOutlined />
                  <span className="nav-text">Información</span>
                </Link>
              </Menu.Item>
            </SubMenu>
          ) : (
            <Menu.Item key="/admin/competition">
              <Tooltip title="Registre una empresa para habilitar esta opción" placement="top" arrowPointAtCenter color={'#108ee9'}>
                <div>
                  <AimOutlined />
                  <span className="nav-text">Concursos</span>
                </div>
              </Tooltip>
            </Menu.Item>
          )
        }
        <Menu.Item key="/admin/files">
          {
            administrador && administrador.estado ? (
              <Link to="/admin/files">
                <FileExcelOutlined />
                <span className="nav-text">Archivos</span>
              </Link>
            ) : (
              <Tooltip title="Registre una empresa para habilitar esta opción" placement="top" arrowPointAtCenter color={'#108ee9'} defaultVisible={true}>
                <div>
                  <FileExcelOutlined />
                  <span className="nav-text">Archivos</span>
                </div>
              </Tooltip>
            )
          }
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
 
export default MenuSider;