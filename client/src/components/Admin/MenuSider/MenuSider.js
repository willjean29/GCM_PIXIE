import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {Layout, Menu} from 'antd';
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
        <Menu.Item key="/admin/business">
          <Link to="/admin/business">
            <BankOutlined />
            <span className="nav-text">Empresa</span>
          </Link>
        </Menu.Item>
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
        <Menu.Item key="/admin/files">
          <Link to="/admin/files">
            <FileExcelOutlined />
            <span className="nav-text">Archivos</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
 
export default MenuSider;