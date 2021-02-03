import {
  CLIENT_EDIT,
  CLIENT_EDIT_OK,
  CLIENT_EDIT_ERROR,
  CLIENT_IMAGE,
  CLIENT_IMAGE_OK,
  CLIENT_IMAGE_ERROR,
} from "../types";
import { clienteAxios } from "../../config/clienteAxios";

export const actualizarClienteAction = (dataClient) => {
  return async (dispatch) => {
    dispatch(actualizarCliente());
    try {
      const response = await clienteAxios.put("/client", dataClient);
      const data = response.data;
      Notification(data.ok, data.msg);
      dispatch(actualizarClienteOk(data.client));
    } catch (error) {
      const msg = error.response.data
        ? error.response.data.err.msg
        : "Hubo un error";
      Notification(error.response.data.ok, msg);
      dispatch(actualizarClienteError());
    }
  };
};

const actualizarCliente = () => ({
  type: CLIENT_EDIT,
});
const actualizarClienteOk = (data) => ({
  type: CLIENT_EDIT_OK,
  payload: data,
});
const actualizarClienteError = () => ({
  type: CLIENT_EDIT_ERROR,
});

export const imagenClienteAction = (dataImage) => {
  return async (dispatch) => {
    dispatch(imagenCliente());
    try {
      const formData = new FormData();
      formData.append("image", dataImage.file);
      const response = await clienteAxios.put("/client/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = response.data;
      Notification(data.ok, data.msg);
      console.log(data);
      dispatch(imagenClienteOk(data.client));
    } catch (error) {
      const msg = error.response.data
        ? error.response.data.err.msg
        : "Hubo un error";
      Notification(error.response.data.ok, msg);
      dispatch(imagenClienteError());
    }
  };
};

const imagenCliente = () => ({
  type: CLIENT_IMAGE,
});
const imagenClienteOk = (data) => ({
  type: CLIENT_IMAGE_OK,
  payload: data,
});
const imagenClienteError = () => ({
  type: CLIENT_IMAGE_ERROR,
});
