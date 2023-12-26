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

const jsonBorrar = [
  {
    name_personal: "jean1",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 1,
  },
  {
    name_personal: "jean2",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 2,
  },
  {
    name_personal: "jean3",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 3,
  },
  {
    name_personal: "jean4",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 1,
  },
  {
    name_personal: "jean5",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 1,
  },
  {
    name_personal: "jean6",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 1,
  },
  {
    name_personal: "jean7",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 1,
  },
  {
    name_personal: "jean8",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 3,
  },
  {
    name_personal: "jean9",
    type_support: "soporte de impresora",
    date: "11-12-32",
    status: 2,
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
              <Menu.Item key="1" onClick={() => handleView(record)}>
                <EyeOutlined /> Ver
              </Menu.Item>
              {record.status == 1 && (
                <Menu.Item key="2">
                  <EditOutlined /> Aceptar
                </Menu.Item>
              )}
              {record.status == 2 && (
                <Menu.Item key="2">
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
          <span className="title-table">Historial de Solicitudes</span>
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
        title="Características"
        open={openModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="close" onClick={handleCloseModal}>
            Cerrar
          </Button>,
        ]}
      >
        {/* <p><strong>Nombre:</strong> {selectedRowData.name}</p>
          <p><strong>Edad:</strong> {selectedRowData.username}</p>
          <p><strong>Dirección:</strong> {selectedRowData.email}</p> */}
        <table className="tableDescription">
          <tbody>
            <tr>
              <th>Nombre</th>
              <td>{selectedRowData.name}</td>
            </tr>
            <tr>
              <th>Apellidos</th>
              <td>{selectedRowData.username}</td>
            </tr>
            <tr>
              <th>Correo</th>
              <td>{selectedRowData.email}</td>
            </tr>
            <tr>
              <th colSpan={2} style={{ textAlign: "center" }}>
                Dirección
              </th>
            </tr>
            <tr>
              <th>Calle</th>
              <td>
                {selectedRowData.address
                  ? selectedRowData.address.street
                  : "No disponible"}
              </td>
            </tr>
            <tr>
              <th>Suite</th>
              <td>
                {selectedRowData.address
                  ? selectedRowData.address.suite
                  : "No disponlible"}
              </td>
            </tr>
            <tr>
              <th>Ciudad</th>
              <td>
                {selectedRowData.address
                  ? selectedRowData.address.city
                  : "No disponlible"}
              </td>
            </tr>
            <tr>
              <th>zip doce</th>
              <td>
                {selectedRowData.address
                  ? selectedRowData.address.zipcode
                  : "No disponible"}
              </td>
            </tr>
            <tr>
              <th>Telefono</th>
              <td>{selectedRowData.phone}</td>
            </tr>
            <tr>
              <th>Sitio web</th>
              <td>{selectedRowData.website}</td>
            </tr>
            <tr>
              <th colSpan={2} style={{ textAlign: "center" }}>
                Compañia
              </th>
            </tr>
            <tr>
              <th>nombre</th>
              <td>
                {selectedRowData.company
                  ? selectedRowData.company.name
                  : "No disponible"}
              </td>
            </tr>
            <tr>
              <th>catchPhrase</th>
              <td>
                {selectedRowData.company
                  ? selectedRowData.company.catchPhrase
                  : "No disponible"}
              </td>
            </tr>
            <tr>
              <th>bs</th>
              <td>
                {selectedRowData.company
                  ? selectedRowData.company.bs
                  : "No disponible"}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
export default Request;