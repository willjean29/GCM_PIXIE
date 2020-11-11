import React, {useState, useCallback} from 'react';
import {Card, Avatar} from 'antd';
import {useDropzone} from 'react-dropzone';
import NoAvatar from '../../../../../../assets/img/png/no-avatar.png';
import './Logo.scss';
const Logo = () => {
  const [avatar, setAvatar] = useState(null);
  const onDropAccepted = useCallback(
    (acceptedFiles ) => {
      const file = acceptedFiles[0];
      setAvatar({file, preview: URL.createObjectURL(file)});
      console.log(file);
    },
    [setAvatar],
  )

  // const onDropRejected = () => {
  //   notification.open({
  //     type : "error",
  //     message: "Ingrese una imagen valida"
  //   })
  // }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: 'image/jpg, image/png, image/jpeg',
    noKeyboard: true,
    onDropAccepted
  });

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
      <div className="logo-competition__message">
        <h3>Importante</h3>
        <p>El archivo debe ser una extension de imagen valida.</p>
      </div>
    </Card>

  )
}
 
export default Logo;