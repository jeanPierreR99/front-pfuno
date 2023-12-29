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
} from "antd";
import axios from "axios";
import DraggerA from "./DraggerA";

const jsonBorrar = [
  {
    name_personal: "jean pierre",
    type_support: "soporte de impresoras",
    date: "28-12-2023",
    status: 1,
  },
  {
    name_personal: "luis angel",
    type_support: "mantenimiento preventivo",
    date: "28-12-2023",
    status: 2,
  },
  {
    name_personal: "jefferson",
    type_support: "optimizacion de sistema",
    date: "29-12-2023",
    status: 3,
  },
];

const Request = () => {
  const [getData, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre del modal
  const [selectedRowData, setSelectedRowData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );
        setData(response.data);
      } catch (error) {
        console.error("error .......", error);
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
      title: "Personal administrativo",
      dataIndex: "name_personal",
      key: "name_personal",
      ...getColumnSearchProps("name_personal"),
    },
    {
      title: "Tipo de soporte",
      dataIndex: "type_support",
      key: "type_support",
      ...getColumnSearchProps("type_support"),
    },
    {
      title: "Fecha",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date.length - b.date.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Estado",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <span>
          {record.status == 1 ? (
            <Badge
              className="site-badge-count-109"
              count="Solicitado"
              style={{
                backgroundColor: "#faad14",
              }}
            />
          ) : record.status == 2 ? (
            <Badge
              className="site-badge-count-109"
              count="Aceptado"
              style={{
                backgroundColor: "#56bcc7",
              }}
            />
          ) : (
            <Badge
              className="site-badge-count-109"
              count="Firmado"
              style={{
                backgroundColor: "#52c41a",
              }}
            />
          )}
        </span>
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
              <a href="http://18.219.214.89:4000/file/download" target="_blank"><EyeOutlined /> Ver</a>
              </Menu.Item>
              {record.status == 1 && (
                <Menu.Item key="2">
                  <EditOutlined /> Aceptar
                </Menu.Item>
              )}
              {record.status == 2 && (
                <Menu.Item key="2" onClick={() => handleView(record)}>
                  <EditOutlined /> Firmar
                </Menu.Item>
              )}
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
        <span style={{color:'blue', opacity:'.7'}}>Solicitud de soporte</span>
        </div>
        <Table
          className="table"
          columns={columns}
          dataSource={jsonBorrar}
          rowKey="id"
          scroll={{
            x: "auto",
          }}
        />
      </div>
      <Modal
        title="Firmar documento 000x1"
        open={openModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Cerrar
          </Button>,
        ]}
      >
      <DraggerA></DraggerA>
      </Modal>
    </div>
    // <iframe src="http://18.219.214.89/firm" style={{height:"100vh", width:"600px"}}></iframe>
  );
};
export default Request;
