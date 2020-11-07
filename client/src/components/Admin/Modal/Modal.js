import React from 'react';
import {Modal as ModalAnt} from 'antd';
const Modal = (props) =>{
    const {title, isVisible, setIsVisible} = props;
    return(
        <ModalAnt
            title = {title}
            visible = {isVisible}
            onCancel={()=>setIsVisible(false)}  
            footer={false}
        >
            {props.children}
        </ModalAnt>
    );
}

export default Modal;