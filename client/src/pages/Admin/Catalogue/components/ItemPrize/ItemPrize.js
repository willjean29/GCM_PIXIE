import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Input, Card} from 'antd';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import './ItemPrize.scss';
const ItemPrize = ({file, setListFiles, setCargar, cargar}) => {
  const [preview, setPreview] = useState("");
  const [dataItem, setDataItem] = useState({
    nombre: '',
    precio: '',
    categoria: '',
    puntos: '',
    descripcion: '',
    image: file.originFileObj
  })
  
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  
  const handleChange = (event) => {
    setDataItem({
      ...dataItem,
      [event.target.name]: event.target.value
    })
  }

  useEffect(async() => {
    const URL = await getBase64(file.originFileObj);
    setPreview(URL);
  }, [file]);

  useEffect(() => {
    if(cargar){
      setListFiles(files => ([
        ...files,
        dataItem
      ]))
      console.log("cambio en el valor de ", cargar);
    }
  }, [cargar])

  return (  
    <Card
      hoverable
    >
      <Row gutter={24} className="item-prize">
        <Col span={24}>
          <label>Premio</label>
        </Col>
        <Col span={24} md={4} className="item-prize__contenedor">
          <div className="item-prize__image">
            <img src={preview} alt=""/>
          </div>
        </Col>
        <Col span={24} md={20}>
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Nombre"
              >
                <Input
                  type="text"
                  name="nombre"
                  onChange={handleChange}
                  required
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Precio"
              >
                <Input
                  type="text"
                  name="precio"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Categoría"
              >
                <Input
                  type="text"
                  name="categoria"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Puntos"
              >
                <Input
                  type="text"
                  name="puntos"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item label="Descripción">
                <Input.TextArea
                  type="text"
                  name="descripcion"
                  onChange={handleChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>

  );
}
 
export default ItemPrize;