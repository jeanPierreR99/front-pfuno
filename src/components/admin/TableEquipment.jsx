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
import { API_URL } from "../../constants";

const TableEquipment = () => {
  const [getData, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false); // Estado para controlar la apertura y cierre del modal
  const [selectedRowData, setSelectedRowData] = useState({});
  const [countEquit, setCountEquit] = useState(null);

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
        const response = await axios.get(`${API_URL}/api/device/all/resume`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data.data);
        setCountEquit(response.data.data.length);
        console.log(response.data.data);
      } catch (error) {
        console.error("Hubo un error al obtener los datos:", error);
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
      title: "Código patrimonial",
      dataIndex: "patrimonial_code",
      key: "patrimonial_code",
      sorter: (a, b) => a.patrimonial_code.length - b.patrimonial_code.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("patrimonial_code"),
    },
    {
      title: "Código serial",
      dataIndex: "serial_code",
      key: "serial_code",
      sorter: (a, b) => a.serial_code.length - b.serial_code.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("serial_code"),
    },
    {
      title: "Dependencia",
      dataIndex: "dependency_device",
      key: "dependency_device",
      sorter: (a, b) => a.dependency_device.length - b.dependency_device.length,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps("dependency_device"),
    },
    {
      title: "Estado",
      dataIndex: "state_device",
      key: "state_device",
      width: "20%",
      sorter: (a, b) => a.state_device.length - b.state_device.length,
      sortDirections: ["descend", "ascend"],
      render: (text, record) => (
        <span>
          {record.state_device && record.state_device == "OPERATIVO" ? (
            <Badge
              className="site-badge-count-109"
              count="OPERATIVO"
              style={{
                backgroundColor: "#52c41a",
              }}
            />
          ) : (
            <Badge
              className="site-badge-count-109"
              count="INOPERATIVO"
              style={{
                backgroundColor: "red",
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
        <span style={{color:'blue', opacity:'.7'}}>Equipos informáticos</span>
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
              <th colSpan={2} style={{ textAlign: "center" }}>
                Características
              </th>
            </tr>
            <tr>
              <th>Código patrimonial</th>
              <td>{selectedRowData.patrimonial_code}</td>
            </tr>
            <tr>
              <th>Código serial</th>
              <td>{selectedRowData.serial_code}</td>
            </tr>
            <tr>
              <th>Marca</th>
              <td>{selectedRowData.brand}</td>
            </tr>
            <tr>
              <th>Modelo</th>
              <td>{selectedRowData.model_name}</td>
            </tr>
            <tr>
              <th>Estado</th>
              <td style={{color:selectedRowData.state_device == "OPERATIVO"?"green":"red"}}>{selectedRowData.state_device}</td>
            </tr>
            <tr>
              <th>Tipo de servicio</th>
              <td>{selectedRowData.type_device}</td>
            </tr>
            <tr>
              <th>Dependencia</th>
              <td>{selectedRowData.dependency_device}</td>
            </tr>
            <tr>
              <th>Fecha de adquisición</th>
              <td>{selectedRowData.adquisition_date}</td>
            </tr>
            <tr>
              <th colSpan={2} style={{ textAlign: "center" }}>
                Características internas
              </th>
            </tr>
            <tr>
              <th>Procesador</th>
              <td>
                {selectedRowData.more_info
                  ? selectedRowData.more_info.procesador
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th>Memoria ram</th>
              <td>
                {selectedRowData.more_info
                  ? selectedRowData.more_info.ram
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th>Almacenamiento</th>
              <td>
                {selectedRowData.more_info
                  ? selectedRowData.more_info.almacenamiento
                  : "N/A"}
              </td>
            </tr>
            <tr>
              <th>Tipo de disco</th>
              <td>
                {selectedRowData.more_info
                  ? selectedRowData.more_info.tipo_disco
                  : "N/A"}
              </td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
export default TableEquipment;
