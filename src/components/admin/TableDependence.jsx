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
} from "antd";
import axios from "axios";
import { API_URL } from "../../constants";

const TableDependence = () => {
  const [getData, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre del modal
  const [selectedRowData, setSelectedRowData] = useState({});
  const [countEquit, setCountEquit] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const storedUser = localStorage.getItem("user");
      const storedUserParse = JSON.parse(storedUser)
      let token = ""
      if (storedUserParse) {
        token = storedUserParse.token
        console.log(token)
      }
      try {
        const response = await axios.get(`${API_URL}/api/network/all/resume`, {
          headers: {
            'Authorization': `Bearer ${token}` 
          }});
        setData(response.data.data);
        setCountEquit(response.data.data.length)
        console.log(response.data.data)
      } catch (error) {
        console.error('Hubo un error al obtener los datos:', error);
      }
    };

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

  const handleView = (record) => {
    setOpenModal(true);
    setSelectedRowData(record);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRowData({});
  };

  const columns = [
    {
      title: "Sede",
      dataIndex: "campus_name",
      key: "campus_name",
      width: "20%",
      sorter: (a, b) => a.campus_name.length - b.campus_name.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("campus_name"),
    },
    {
      title: "Nombre",
      dataIndex: "dependendy_name",
      key: "dependendy_name",
      width: "30%",
      sorter: (a, b) => a.dependendy_name.length - b.dependendy_name.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "IP",
      dataIndex: "ip_address",
      key: "ip_address",
      width: "20%",
      sorter: (a, b) => a.ip_address.length - b.ip_address.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Acción",
      width: "10%",
      render: (text, record) => (
        <Dropdown
          trigger={"click"}
          overlay={
            <Menu>
              <Menu.Item key="1" onClick={() => handleView(record)}>
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
        <span style={{color:'blue', opacity:'.7'}}>Dependencias</span>
          <Button type="primary">+ Agregar</Button>
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
        title="Características"
        open={openModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Cerrar
          </Button>,
        ]}
      >
        <table className="tableDescription">
          <tbody>
            <tr>
              <th>Sede</th>
              <td>{selectedRowData.campus_name}</td>
            </tr>
            <tr>
              <th>Dependencia</th>
              <td>{selectedRowData.dependendy_name}</td>
            </tr>
            <tr>
              <th>Dirección IP</th>
              <td>{selectedRowData.ip_address}</td>
            </tr>
            <tr>
              <th>Zona</th>
              <td>{selectedRowData.zone_name}</td>
            </tr>
            <tr>
              <th>Piso</th>
              <td>{selectedRowData.number_floor}</td>
            </tr>
            <tr>
              <th>Tipo de noexión</th>
              <td>{selectedRowData.type_connection}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
export default TableDependence;
