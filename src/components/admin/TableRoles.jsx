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
  Badge
} from "antd";
import axios from "axios";
import { API_URL } from "../../constants";
import ModalAddRole from "./ModalAddRole";

const TableRoles = () => {
  const [getData, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre del modal

  const fetchData = async () => {
    const storedUser = localStorage.getItem("user");
    const storedUserParse = JSON.parse(storedUser);
    let token = "";
    if (storedUserParse) {
      token = storedUserParse.token;
      console.log(token);
    }
    try {
      const response = await axios.get(`${API_URL}/api/users/all`, {
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

  useEffect(() => {
    fetchData();
  }, []);

  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      (record[dataIndex]
        ? record[dataIndex].toString().toLowerCase()
        : ""
      ).includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

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

  const success = () => {
    Modal.success({
      content: "Eliminado",
    });
  };

  const handleView = () => {
    setOpenModal(true);
  };

  const columns = [
    {
      title: "DNI",
      dataIndex: "person.dni",
      key: "person.dni",
      ...getColumnSearchProps("person.dni"),
      render: (text, record) => (
        <span>{record.person.dni ? record.person.dni : "No disponible"}</span>
      ),
    },
    {
      title: "Nombres",
      dataIndex: "person.first_name",
      key: "person.first_name",
      ...getColumnSearchProps("person.first_name"),
      render: (text, record) => (
        <span>{record.person.first_name ? record.person.first_name : "No disponible"}</span>
      ),
    },
    {
      title: "Apellidos",
      dataIndex: "person.last_name",
      key: "person.last_name",
      ...getColumnSearchProps("person.last_name"),
      render: (text, record) => (
        <span>{record.person.last_name ? record.person.last_name : "No disponible"}</span>
      ),
    },
    {
      title: "Rol",
      dataIndex: "role_name",
      key: "role_name",
      ...getColumnSearchProps("role_name"),
    },
    {
      title: "Estado",
      dataIndex: "active",
      key: "active",
      render: (text, record) => (
        record.active ==true?( <Badge
          className="site-badge-count-109"
          count="Habilitado"
          style={{
            backgroundColor: "#52c41a",
          }}
        />):
        ( <Badge
          className="site-badge-count-109"
          count="Desabilitado"
          style={{
            backgroundColor: "#faad14",
          }}
        />)
      ),
    },
    {
      title: "Acción",
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
          <span className="title-table">Roles y privilegios</span>
          <Button type="primary" onClick={() => handleView()}>+ Nuevo</Button>
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
<ModalAddRole openModal={openModal} setOpenModal={setOpenModal} fetchData={fetchData} >

</ModalAddRole>
    </div>
  );
};
export default TableRoles;
