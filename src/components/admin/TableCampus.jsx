import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import {
  Button,
  Input,
  Space,
  Table,
  Popconfirm,
  Modal,
  Menu,
  Dropdown,
  Badge,
  Select,
} from "antd";
import axios from "axios";
import { API_URL } from "../../constants";

const TableCampus = () => {
  const [getData, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre del modal

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");
      const storedUserParse = JSON.parse(storedUser);
      let token = "";
      if (storedUserParse) {
        token = storedUserParse.token;
        console.log(token);
      }
      try {
        const response = await axios.get(`${API_URL}/api/campus/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
      }
    };

    fetchData();
  }, []);

  const showPopconfirm = (record) => {
    // setOpen(true);
    setOpen(record.key);
  };

  const handleOk = async (key) => {
    setConfirmLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    setConfirmLoading(false);
    success();
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const success = () => {
    Modal.success({
      content: "Eliminado",
    });
  };

  const handleNew = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "20%",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Abreviación",
      dataIndex: "abbreviation",
      key: "abbreviation",
      width: "10%",
      sorter: (a, b) => a.abbreviation.length - b.abbreviation.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Dirección",
      dataIndex: "address",
      key: "address",
      width: "20%",
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Estado",
      dataIndex: "state",
      key: "state",
      width: "20%",
      sorter: (a, b) => a.state.length - b.state.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>
          {record.address ? (
            <Badge
              className="site-badge-count-109"
              count="habilitado"
              style={{
                backgroundColor: "#52c41a",
              }}
            />
          ) : (
            <Badge
              className="site-badge-count-109"
              count="desabilitado"
              style={{
                backgroundColor: "#faad14",
              }}
            />
          )}
        </span>
      ),
    },
    {
      title: "Acción",
      width: "10%",
      render: (text, record) => (
        <Dropdown
          trigger={"click"}
          overlay={
            <Menu>
              <Menu.Item key="1">
                <EyeOutlined /> Ver
              </Menu.Item>
              <Menu.Item key="2" onClick={() => handleEdit(record)}>
                <EditOutlined /> Editar
              </Menu.Item>
              <Menu.Item key="3" style={{ color: "red" }}>
                <Popconfirm
                  title="¿Seguro que desea eliminar?"
                  visible={open == record.key}
                  onConfirm={() => handleOk(record)}
                  okButtonProps={{
                    style: { background: "red" },
                  }}
                  okText={confirmLoading ? "Eliminando..." : "Sí"}
                >
                  <a>
                    {confirmLoading ? "Eliminando..." : <DeleteOutlined />}{" "}
                    Eliminar
                  </a>
                </Popconfirm>
              </Menu.Item>
            </Menu>
          }
        >
          <Button onClick={() => showPopconfirm(record)}>
            <MoreOutlined />
          </Button>
        </Dropdown>
      ),
      key: "Accion",
    },
  ];

  return (
    <div>
      <div className="content-table">
        <div className="flex">
        <span style={{color:'blue', opacity:'.7'}}>Sedes</span>
          <Button type="primary" onClick={() => handleNew()}>
            + Nuevo
          </Button>
        </div>
        <Table
          className="table"
          columns={columns}
          dataSource={getData}
          rowKey="id"
          scroll={{
            x: "auto",
          }}
        />
      </div>
      <Modal
        title="Nueva Sede"
        open={openModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Cerrar
          </Button>,
        ]}
      >
        <div className="modal-content">
          <div className="modal-group">
            <span>Nombre</span>
            <Input />
          </div>
          <div className="modal-group">
            <span>Abreviación</span>
            <Input />
          </div>
          <div className="modal-group">
            <span>Dirección</span>
            <Input />
          </div>
          <div className="modal-group">
            <span>Nombre</span>
            <Input />
          </div>
          <div className="modal-group">
            <Space wrap>
              <span>Estado</span>
              <Select
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 1,
                    label: "Habilitado",
                  },
                  {
                    value: 0,
                    label: "Desabilitado",
                  },
                ]}
              />
            </Space>
          </div>
          <div className="modal-group">
            <Button type="primary">agregar</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
export default TableCampus;
