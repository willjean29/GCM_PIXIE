import React from "react";
import { useSelector } from "react-redux";
import { Card, Row, Col, Descriptions, Tabs, Image, Button } from "antd";
import NoAvatar from "../../../assets/img/png/no-avatar.png";
import {
  RedditOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./Profile.scss";
import EditProfile from "./components/EditProfile/EditProfile";
import Logo from "./components/Logo/Logo";

const Profile = () => {
  const client = useSelector((state) => state.authentication.user);
  const { TabPane } = Tabs;
  return (
    <>
      <Card>
        <h1 className="title-card">Información Personal</h1>
      </Card>
      <Row gutter={24} className="info-profile">
        <Col
          span={24}
          md={8}
          style={{ textAlign: "center" }}
          className="info-profile__card"
        >
          <Card
            hoverable
            className="card"
            cover={
              <Image
                width={200}
                src={
                  client ? (client.image ? client.image : NoAvatar) : NoAvatar
                }
                className="card__image"
              />
            }
          >
            <Card.Meta
              title="Cliente"
              description="Cliente Registrado"
              className="card__description"
            />
            <Descriptions bordered column={1} className="card__content">
              <Descriptions.Item label="DNI">
                {client && client.dni}
              </Descriptions.Item>
              <Descriptions.Item label="Edad">
                {client && (client.edad ? client.edad : "--")}
              </Descriptions.Item>
              <Descriptions.Item label="Género">Masculino</Descriptions.Item>
            </Descriptions>
            <Button
              type="primary"
              style={{ width: "100%" }}
              className="btn-submit"
            >
              Seguir
            </Button>
          </Card>
        </Col>
        <Col span={24} md={16} className="info-competition__tabs">
          <Card hoverable>
            <Tabs className="tab-content">
              <TabPane
                tab={
                  <span className="tab_text">
                    <InfoCircleOutlined />
                    Información
                  </span>
                }
                key="1"
              ></TabPane>
              <TabPane
                tab={
                  <span className="tab_text">
                    <CheckCircleOutlined />
                    Editar
                  </span>
                }
                key="2"
              >
                {/* <Maps/> */}
                <EditProfile client={client} />
              </TabPane>
              <TabPane
                tab={
                  <span className="tab_text">
                    <RedditOutlined />
                    Logo
                  </span>
                }
                key="3"
              >
                <Logo />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Profile;
