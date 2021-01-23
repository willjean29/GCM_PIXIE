import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Layout, Menu, Tooltip, Avatar} from 'antd';
import { useMediaQuery } from 'react-responsive';
import {
  HomeOutlined, 
  UserOutlined, 
  FileExcelOutlined, 
  BankOutlined, 
  AimOutlined, 
  CarryOutOutlined,
  DropboxOutlined,
  UsergroupAddOutlined
} from '@ant-design/icons';
import NoAvatar from '../../../assets/img/png/no-avatar.png';
import './MenuSider.scss';
const MenuSider = (props) => {
  const {menuCollapsed, setMenuCollapsed} = props;
  const {location:{pathname}} = useHistory();
  const {SubMenu} = Menu;
  const {Sider} = Layout;
  const administrador = useSelector(state => state.authentication.user);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 768px)' })
  useEffect(() => {
    isTabletOrMobile && setMenuCollapsed(true) 
    // eslint-disable-next-line
  }, [isTabletOrMobile])
  return (  
    <>
    <Sider className="admin-sider" collapsed={menuCollapsed}
      breakpoint="md"
      collapsedWidth= {isTabletOrMobile ? "0" : "80"}
      onBreakpoint={broken => {
        console.log(broken+ "dsfsdfsdfsf");
      }}
    >
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[pathname]}>
        <Menu.Item key="/profile">
          <Avatar
              src={administrador ? (administrador.image ? administrador.image : NoAvatar) : (NoAvatar)}
              style={{marginLeft: '-8px'}}
            />
          <span style={{paddingLeft: 28}}>
            {administrador && administrador.names}
          </span>
        </Menu.Item>
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
        <Menu.Item key="/admin/business/clients">
          <Link to="/admin/business/clients">
            <UsergroupAddOutlined />
            <span className="nav-text">Clientes</span>
          </Link>
        </Menu.Item>
        {
          administrador && administrador.estado ? (
            <SubMenu icon={<AimOutlined />} title="Concursos">
            {
              administrador.empresa.concursos.length > 0 ? (
                <Menu.Item key="/admin/competition/info">
                <Link to="/admin/competition/info">
                  <CarryOutOutlined />
                  <span className="nav-text">Información</span>
                </Link>
              </Menu.Item>
              ) : (
                <Menu.Item key="/admin/competition/new">
                  <Link to="/admin/competition/new">
                    <CarryOutOutlined />
                    <span className="nav-text">Registrar</span>
                  </Link>
                </Menu.Item>
              )
            }
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
        {
          administrador && administrador.estado ? (
            <SubMenu icon={<DropboxOutlined />} title="Premios">
            {
              administrador.empresa.concursos.length > 0 ? (
                <Menu.Item key="/admin/catalogue/info">
                <Link to="/admin/catalogue/info">
                  <CarryOutOutlined />
                  <span className="nav-text">Información</span>
                </Link>
              </Menu.Item>
              ) : (
                <Menu.Item key="/admin/catalogue/info">
                  <Tooltip title="Registre un concurso para habilitar esta opción" placement="top" arrowPointAtCenter color={'#108ee9'}>
                    <div>
                      <AimOutlined />
                      <span className="nav-text">Información</span>
                    </div>
                  </Tooltip>
                </Menu.Item>
              )
            }
            </SubMenu>
          ) : (
            <Menu.Item key="/admin/catalogue/info">
              <Tooltip title="Registre una empresa para habilitar esta opción" placement="top" arrowPointAtCenter color={'#108ee9'}>
                <div>
                  <DropboxOutlined />
                  <span className="nav-text">Premios</span>
                </div>
              </Tooltip>
            </Menu.Item>
          )
        }
        {/* <SubMenu icon={<AimOutlined />} title="Premios">
          <Menu.Item key="/admin/catalogue/info">
            <Link to="/admin/catalogue/info">
              <CarryOutOutlined />
              <span className="nav-text">Información</span>
            </Link>
          </Menu.Item>
        </SubMenu> */}

        <Menu.Item key="/admin/files">
          {
            administrador && administrador.estado ? (
              <Link to="/admin/files">
                <FileExcelOutlined />
                <span className="nav-text">Archivos</span>
              </Link>
            ) : (
              <Tooltip title="Registre una empresa para habilitar esta opción" placement="top" arrowPointAtCenter color={'#108ee9'}>
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
    </>
  );
}
 
export default MenuSider;