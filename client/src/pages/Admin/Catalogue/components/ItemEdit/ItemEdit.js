import React, {useState} from 'react';
import {Form, Row, Col, Input, Card, Select, Avatar, Button} from 'antd';
import './ItemEdit.scss';
const ItemEdit = ({prize, categories}) => {
  const {Option} = Select;
  const [dataItem, setDataItem] = useState({
    nombre: prize.name,
    precio: prize.price,
    categoria: prize.category.name,
    puntos: prize.points,
    descripcion: prize.description
  })

  const handleChange = (event) => {
    setDataItem({
      ...dataItem,
      [event.target.name]: event.target.value
    })
  }
  const handleSubmit = () => {
    console.log(dataItem);
  }
  return ( 
    <Card
      hoverable
      className="card-item"
    >
      <Form
        layout="vertical"
        onFinish={handleSubmit}
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
              src={prize.url}
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
                    defaultValue={prize.name}
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
                    defaultValue={prize.price}
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
                    defaultValue={prize.category.name}
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
                    defaultValue={prize.points}
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
                    defaultValue={prize.description}
                    required
                  />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={24} justify="end">
          <Col span={6}>
            <Button type="primary" htmlType="submit" className="btn-submit">
              Actualizar
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>

   );
}
 
export default ItemEdit;