import React, { useState } from 'react';
import {FacebookOutlined, LinkedinOutlined, InstagramOutlined } from '@ant-design/icons'
import {
  Form,
  Input,
  Button,message
} from 'antd';
import './Edit.scss';

function handleChange (e){
    //console.log(e)
    //let files = e.target.files[0];//FileList[0] = file
    //console.warn(e.target.files.length);
      message.success('Se actualizó correctamente!');
    
      /*this.setState({
        imageUrl:'',
        loading : true
      })*/
}

const Edit = () => {

  return (  
    <div className="card">
      <div className="card__header">
        <h2 className ="card__header__title">Información de la Empresa</h2> 
      </div>
      <>
      <Form
      
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 13,
        }}
        layout="horizontal"
        >
          
          <Form.Item label="Razón Social:" className="label">
            <Input  className="label__input" disabled/>
          </Form.Item>
          <Form.Item label="Nombre comercial:" className="label">
            <Input className="label__input" disabled/>
          </Form.Item>
          <Form.Item label="Dirección" className="label">
            <Input className="label__input" disabled/>
          </Form.Item>
          <Form.Item label="Estado:" className="label">
            <Input className="label__input" disabled/>
          </Form.Item>
          <Form.Item label="Tipo:" className="label">
            <Input className="label__input" disabled/>
          </Form.Item>
          <Form.Item label="Departamento:" className="label">
            <Input className="label__input" disabled/>
          </Form.Item>
          <Form.Item label="Provincia:" className="label">
            <Input className="label__input" disabled/>
          </Form.Item>
          <Form.Item label="Distrito:" className="label">
            <Input className="label__input" disabled/>
          </Form.Item>
          <Form.Item  label="Redes" className="label" validateStatus="validating"></Form.Item>
          <Form.Item className="label">
            <Input size={"large"} prefix={<FacebookOutlined />} className="label__input_Text"/>
            </Form.Item>
            <Form.Item className="label">  
            <Input size={"large"} prefix={<LinkedinOutlined />} className="label__input_Text"/>
          </Form.Item>
          <Form.Item className="label">
            <Input size={"large"} prefix={<InstagramOutlined />} className="label__input_Text"/>
          </Form.Item>
          <Form.Item >
            <Button className="btn_primary" onClick={handleChange} size={"large"} block>Actualizar</Button>
          </Form.Item>
        </Form>
        </>
        <div className="card__footer">
        </div>
      </div>
  );
}
 
export default Edit; 