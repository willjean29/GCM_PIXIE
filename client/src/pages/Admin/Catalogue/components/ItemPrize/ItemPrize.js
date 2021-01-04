import React, {useState, useEffect} from 'react';
import {Form, Row, Col, Input, Card, Select, Avatar} from 'antd';
import './ItemPrize.scss';
const ItemPrize = ({file, setListFiles, setCargar, cargar, categories}) => {
  const {Option} = Select;
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
      className="card-item"
    >
      <Row gutter={24} className="item-prize">
        <Col span={24}>
          <label>Premio</label>
        </Col>
        <Col span={24} md={6} className="item-prize__contenedor">
          {/* <div className="item-prize__image">
            <img src={preview} alt=""/>
          </div> */}
          <Avatar
            src={preview}
            className="item-prize__image"
            size={{ xs: 120, sm: 120, md: 120, lg: 120, xl: 120, xxl: 120 }}
            shape="square"
          />
        </Col>
        <Col span={24} md={18}>
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
                  type="number"
                  name="precio"
                  min={20}
                  onChange={handleChange}
                  required
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item label="Categoría"
              >
                <Select
                  showArrow
                  name="categoria"
                  placeholder="Seleccionar Categoría"
                  required
                  onChange={(value) => setDataItem(data => ({
                    ...data,
                    categoria: value
                  })) }
                  // defaultValue={formik.values.genero}
                >
                  {
                    categories.map((category,index) => (
                      <Option value={category.name} key={index}>{category.name}</Option>
                    ))
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} md={12}>
              <Form.Item label="Puntos"
              >
                <Input
                  type="number"
                  name="puntos"
                  min={20}
                  onChange={handleChange}
                  required
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
                  required
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