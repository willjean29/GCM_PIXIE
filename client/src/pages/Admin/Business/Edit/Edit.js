import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Radio
} from 'antd';
import './Edit.scss';

const Edit = () => {

  return (  
    <div className="card">
      <div className="card__header">
        <h2 className ="card__header__title">Información de la Empresa</h2>
      </div>
      <>
      <Form
      
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        >
          <Form.Item label="Razón Social:" className="col-md-6">
            <Input  disabled/>
          </Form.Item>
          <Form.Item label="Nombre comercial:" className="col-md-6">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="Dirección" className="col-md-6">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="Estado:" className="col-md-6">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="Tipo:" className="col-md-6">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="Departamento:" className="col-md-6">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="Provincia:" className="col-md-6">
            <Input disabled/>
          </Form.Item>
          <Form.Item label="Distrito:" className="col-md-6">
            <Input disabled/>
          </Form.Item>
          <Form.Item >
            <Button className="btn_primary" size={"large"}>Actualizar</Button>
          </Form.Item>
        </Form>
        </>
      </div>
  );
}
 
export default Edit; 