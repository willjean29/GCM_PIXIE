import React, {useState, useCallback} from 'react';
import {Card, Avatar, notification, Button} from 'antd';
import {useDropzone} from 'react-dropzone';
import {useDispatch} from 'react-redux';
import {imagenEmpresaAction} from '../../../../../../redux/actions/businessActions';
import NoAvatar from '../../../../../../assets/img/png/no-avatar.png';
import './Logo.scss';
const Logo = ({business}) => {
  const dispatch = useDispatch();
  const imagenEmpresa = (image) => dispatch(imagenEmpresaAction(image));
  const [avatar, setAvatar] = useState(null);
  const onDropAccepted = useCallback(
    (acceptedFiles ) => {
      const file = acceptedFiles[0];
      setAvatar({file, preview: URL.createObjectURL(file)});
    },
    [setAvatar],
  )

  const onDropRejected = () => {
    notification.open({
      type : "error",
      message: "Ingrese una imagen valida"
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/jpg, image/png, image/jpeg',
    noKeyboard: true,
    onDropAccepted,
    onDropRejected
  });

  const handlerImageSubmit = (avatar) => {
    if(!avatar){
      notification.open({
        type : "error",
        message: "Ingrese una imagen"
      })
      return;
    }
    imagenEmpresa(avatar);
  }

  return (
    <Card type="inner" title="Agregar Logo" className="logo-business" hoverable>
      <div className="logo-business__upload-avatar" {...getRootProps()}>
        <input {...getInputProps()}/>
        {isDragActive ? (
          <Avatar
            size={150}
            src={NoAvatar}
          />
        ): (
          <Avatar
            size={150}
            src={avatar ? avatar.preview : (business.imagen ? business.imagen : NoAvatar)}
          />
        )}
      </div>
      <div style={{textAlign: 'center'}}>
        <Button type="primary" onClick={() => handlerImageSubmit(avatar)}>
          Subir Imagen
        </Button> 
      </div>
      <div className="logo-business__message">
        <h3>Importante</h3>
        <p>El archivo debe ser una extension de imagen valida.</p>
      </div>
    </Card>

  )
}
 
export default Logo;