import React from 'react'
//Upload logo
import { message, Button, Form,Input, Row, Col, Image} from 'antd';

import Logo from '../../../../assets/img/jpg/empresa_null.jpg'

import './LogoBusiness.scss';

function getBase64(e,callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(e.target.files[0]);
  /*return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => 
      resolve(reader.result);
      
      //return post(url,file:e.target.result)
    
    //reader.onerror = error => reject(error);

  });*/
}

function beforeUpload(e) {
  let file = e.target.files[0];
  let isJpgOrPng, isLt2M;
  if(e.target.files.length===1){
    isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpeg';
    console.log(file.type);
    if (!isJpgOrPng) {
      message.error('Solo puedes cargar archivos JPG/PNG/JPEG!');
    }
    isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('El peso de la imagen debe ser menor a 2MB!');
    }
  }
  else{console.log("No selecciono")
      message.error('Seleccione una imagen!');
        this.setState({
          imageUrl:''
        })
      }
  return isJpgOrPng && isLt2M;
};


class LogoBusiness extends React.Component {
  constructor(){
    super()
    this.state = { loading:false, imageUrl:'' }
    this.handleChange = this.handleChange.bind(this)
  }

    handleChange (e){
      if(e.target.files.length===1){
        console.log(e)
        let files = e.target.files[0];//FileList[0] = file
        console.warn(e.target.files.length);
        if(beforeUpload(e)){
          getBase64(e, imageUrl =>
            this.setState({
              imageUrl
            })
          );
          message.success('La imagen se cargó correctamente, pulse ENVIAR!');
        }else{
          this.setState({
            imageUrl:'',
            loading : true
          })
        }
      }else{console.log("No selecciono")
        message.error('Seleccione una imagen!');
        this.setState({
          imageUrl:''
        })
    }
      
    };

    render(){

      const {imageUrl, loading } = this.state;

    return (  
      <>
        <Form
          labelCol={{
            span: 15,
          }}
          wrapperCol={{
            span: 30,
          }}
          layout="horizontal"
          >
            <Row>
            <Col span={5} push={19}>
              <Form.Item  className="input_text">
                <Button type={"primary"} >Enviar</Button>
                
              </Form.Item>
            </Col>
            <Col span={19} pull={5}>
              <Form.Item className="input_text">
                <Input type="file" onChange={this.handleChange}/>
              </Form.Item>
            </Col>
            </Row>
          </Form>
        
          {imageUrl ? <Image width={200} src={imageUrl}/> :  <img className="img_business" src={Logo} alt="avatar"  />}

      </>
    )
  }
}
export default LogoBusiness; 


