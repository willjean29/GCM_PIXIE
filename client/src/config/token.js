import clientAxios from './clienteAxios';

export const tokenAuthAdmin = () => {
  const token = localStorage.getItem('access-token-admin');
  if(token){
    clientAxios.defaults.headers.common['access-token-admin'] = token;
  }else{
    delete clientAxios.defaults.headers.common['access-token-admin'];
  }
}

