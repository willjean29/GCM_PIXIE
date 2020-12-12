import React, {useState, useCallback} from 'react';
import {Card, Avatar, notification, Button} from 'antd';
import {useDropzone} from 'react-dropzone';
import {useDispatch} from 'react-redux';
import {agregarImagenAction} from '../../../../../../redux/actions/competitionActions';
import NoAvatar from '../../../../../../assets/img/png/no-avatar.png';
import './Logo.scss';
const Logo = () => {
  const dispatch = useDispatch();
  const agregarImagen = (image) => dispatch(agregarImagenAction(image));
  const [avatar, setAvatar] = useState(null);
  const onDropAccepted = useCallback(
    (acceptedFiles ) => {
      const file = acceptedFiles[0];
      setAvatar({file, preview: URL.createObjectURL(file)});
      console.log(file);
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
    agregarImagen(avatar);
    console.log(avatar);
  }

  return (
    <Card type="inner" title="Agregar Logo" className="logo-competition">
      <div className="logo-competition__upload-avatar" {...getRootProps()}>
        <input {...getInputProps()}/>
        {isDragActive ? (
          <Avatar
            size={150}
            src={NoAvatar}
          />
        ): (
          <Avatar
            size={150}
            src={avatar ? avatar.preview : NoAvatar}
          />
        )}
      </div>
      <div style={{textAlign: 'center'}}>
        <Button type="primary" onClick={() => handlerImageSubmit(avatar)}>
          Subir Imagen
        </Button> 
      </div>
      <div className="logo-competition__message">
        <h3>Importante</h3>
        <p>El archivo debe ser una extension de imagen valida.</p>
      </div>
    </Card>

  )
}
 
export default Logo;