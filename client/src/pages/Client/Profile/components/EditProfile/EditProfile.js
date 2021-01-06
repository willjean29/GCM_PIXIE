import { Form, Col, Row, Button, Input, Card, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { actualizarClienteAction } from "../../../../../redux/actions/clientActions";
import * as Yup from "yup";
import moment from "moment";
import "./EditProfile.scss";

const EditProfile = ({ client }) => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const actualizarClient = (dataClient) =>
    dispatch(actualizarClienteAction(dataClient));

  const formik = useFormik({
    initialValues: {
      genero: client.genero ? client.genero : "",
    },
    validationSchema: Yup.object({
      genero: Yup.string().required("El género es obligatorio"),
    }),
    onSubmit: (formData) => {
      const data = {
        ...formData,
        fechaNacimiento: moment(formData.fechaNacimiento).format("YYYY-MM-DD"),
      };
      actualizarClient(data);
    },
  });
  return (
    <>
      <Card
        type="inner"
        title="Llenar Formulario"
        className="card-edit-profile"
      >
        <Form
          layout="vertical"
          className="business-form"
          onChange={formik.handleChange}
          onFinish={formik.handleSubmit}
        >
          <Row gutter={24}>
            <Col span={24} md={12}>
              <Form.Item
                label="Género"
                validateStatus={formik.errors.genero ? "error" : "success"}
              >
                <Select
                  showArrow
                  placeholder="Seleccionar Género"
                  onChange={(value) => (formik.values.genero = value)}
                  defaultValue={formik.values.genero}
                >
                  <Option value="Masculino">Masculino</Option>
                  <Option value="Femenino">Femenino</Option>
                </Select>
                <span style={{ color: "#ff4d4f" }}>{formik.errors.genero}</span>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item className="business-form__submit">
            <Row justify="end" gutter={[24, 12]}>
              <Col>
                <Button type="primary" htmlType="submit" className="btn-submit">
                  Actualizar
                </Button>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};
export default EditProfile;
