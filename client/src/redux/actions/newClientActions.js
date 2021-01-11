import {
  DNI,
  DNI_OK,
  DNI_ERROR,
  REGISTER_CLIENT,
  REGISTER_CLIENT_OK,
  REGISTER_CLIENT_ERROR,
} from "../types";
import { clienteAxios } from "../../config/clienteAxios";
import Notification from "../../components/UiElements/Notification";

export const validadDniAction = (next, dni) => {
  return async (dispatch) => {
    dispatch(validarDni());
    try {
      const response = clienteAxios.post("/client/verificar-dni", dni);
      const data = response.data;
      if (data.ok) next();
      Notification(data.ok, data.msg);
      dispatch(validarDniOk(data.user));
    } catch (error) {
      const msg = error.response.data
        ? error.response.data.err.msg
        : "Hubo un error";
      Notification(error.response.data.ok, msg);
      dispatch(validarDniError());
    }
  };
};

const validarDni = () => ({
  type: DNI,
});
const validarDniOk = (dataClient) => ({
  type: DNI_OK,
  payload: dataClient,
});
const validarDniError = () => ({
  type: DNI_ERROR,
});

export const registrarClientAction = (formData, next) => {
  return async (dispatch) => {
    dispatch(registrarClient());
    try {
      const response = await clienteAxios.post("/client/register", formData);
      const data = response.data;
      if (data.ok) next(false);
      Notification(data.ok, data.msg);
      dispatch(registrarClientOk());
    } catch (error) {
      const msg = error.response.data
        ? error.response.data.err.msg
        : "Hubo un error";
      Notification(error.response.data.ok, msg);
      dispatch(registrarClientError());
    }
  };
};

const registrarClient = () => ({
  type: REGISTER_CLIENT,
});
const registrarClientOk = () => ({
  type: REGISTER_CLIENT_OK,
});
const registrarClientError = () => ({
  type: REGISTER_CLIENT_ERROR,
});
