import React from 'react'

import { Descriptions, Button, Form, Input, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, FacebookOutlined, LinkedinOutlined, InstagramOutlined} from '@ant-design/icons';

import './List.scss';

class List extends React.Component {
  
  state ={
    visible:false,
    confirmLoading:false,
    form:{
      razonSocial: '',
      nombreComercial: '',
      provincia: '',
      departamento: '',
      distrito: '',
      direccion: '',
      red1: '',
      red2: '',
      red3: ''
    }
  }

  handleOk =()=> {
    this.setState({confirmLoading:true});
    
    setTimeout(() => {
      this.setState({visible:false,confirmLoading:false});
      message.success("Se actualizó correctamente!")
    }, 2000);
  };

  showModal=() => {
    this.setState({visible:true});
  };

  handleCancel=()=>{
    console.log('Clicked cancel button');
    this.setState({visible:false});
  };

  handleChange = async e =>{
    e.persist();
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]:[e.target.value]
      }
    });
    console.log(this.state.form)
  }
    render(){
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
            <Button type="primary" className="btn_edit" icon={<EditOutlined/> } onClick={this.showModal}>Editar</Button>
            <Button type="primary" className="btn_danger" icon={<DeleteOutlined />} danger>Eliminar</Button>
  
            <Modal
              title="Actualizar datos"
              visible={this.state.visible}
              onOk={this.handleOk}
              confirmLoading={this.state.confirmLoading}
              onCancel={this.handleCancel}
              okText={"Actualizar"}
              cancelText={"Cancelar"}
              maskClosable={false}
              closable={false}
            >
              <div className="card">
              <div className="card__header">
                <h2 className ="card__header__title">Información de la Empresa</h2> 
              </div>
              <>
              <Form
              
                labelCol={{
                  span: 7,
                }}
                wrapperCol={{
                  span: 20,
                }}
                layout="horizontal"
                >
                  
                  <Form.Item label="Razón Social:" className="label">
                    <Input  className="label__input" name="razonSocial" disabled/>
                  </Form.Item>
                  <Form.Item label="Nombre comercial:" className="label">
                    <Input className="label__input" name="nombreComercial" disabled/>
                  </Form.Item>
                  <Form.Item label="Dirección" className="label">
                    <Input className="label__input" name="direccion" disabled/>
                  </Form.Item>
                  <Form.Item label="Estado:" className="label">
                    <Input className="label__input" name="estado" disabled/>
                  </Form.Item>
                  <Form.Item label="Tipo:" className="label">
                    <Input className="label__input" name="tipo" disabled/>
                  </Form.Item>
                  <Form.Item label="Departamento:" className="label">
                    <Input className="label__input" name="departamento" disabled/>
                  </Form.Item>
                  <Form.Item label="Provincia:" className="label">
                    <Input className="label__input" name="provincia" disabled/>
                  </Form.Item>
                  <Form.Item label="Distrito:" className="label">
                    <Input className="label__input" name="distrito" disabled/>
                  </Form.Item>
                  <Form.Item  label="Redes" className="label" ></Form.Item>
                  <Form.Item className="label">
                    <Input size={"large"} prefix={<FacebookOutlined />} name="red1" className="label__input_Text" onChange={this.handleChange}/>
                    </Form.Item>
                    <Form.Item className="label">  
                    <Input size={"large"} prefix={<LinkedinOutlined />} name="red2" className="label__input_Text" onChange={this.handleChange}/>
                  </Form.Item>
                  <Form.Item className="label">
                    <Input size={"large"} prefix={<InstagramOutlined />} name="red3" className="label__input_Text" onChange={this.handleChange}/>
                  </Form.Item>
                </Form>
                </>
                <div className="card__footer">
                </div>
              </div>
            </Modal>
          
  
              
        </>
      );
    }
    
}
export default List; 