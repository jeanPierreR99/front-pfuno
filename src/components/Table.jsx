import { SearchOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Space, Table, Tooltip, Popconfirm, Modal } from "antd";
import axios from "axios";

const TableAnt = () => {
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
  (record[dataIndex] ? record[dataIndex].toString().toLowerCase() : '')
    .includes(value.toLowerCase()),
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

  const showPopconfirm = (key) => {
    // setOpen(true);
    setOpen({ ...open, [key]: true });
  };

  const handleOk = (key) => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen({ ...open, [key]: false });
      setConfirmLoading(false);
      success();
    }, 2000);
  };

  const handleCancel = (key) => {
    console.log("Clicked cancel button");
    setOpen({ ...open, [key]: false });
  };

  const success = () => {
    Modal.success({
      content: "Eliminado",
    });
  };

  const handleAddClick = (record) => {
    setOpenModal(true);
    setSelectedRowData(record);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRowData({});
  };

  const columns = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "20%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Código Postal",
      dataIndex: "address.zipcode",
      key: "address.zipcode",
      width: "10%",
      ...getColumnSearchProps("address.zipcode"),
      render: (text, record) => (
        <span>{record.address ? record.address.zipcode : 'No disponible'}</span>
      ),
    },
    
    {
      title: "Correo",
      dataIndex: "email",
      key: "email",
      width: "20%",
      ...getColumnSearchProps("email"),
      sorter: (a, b) => a.email.length - b.email.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Acción",
      width: "10%",
      render: (text, record) => (
        <Space>
          <Tooltip title="search">
            <Button
              type="primary"
              ghost
              onClick={() => {
                handleAddClick(record);
              }}
            >
              Ver
            </Button>
          </Tooltip>
          <Popconfirm
            title="Eliminar"
            description="¿Seguro que desea eliminar?"
            open={open[record.id]}
            onConfirm={() => {
              handleOk(record.id);
            }}
            okButtonProps={{
              loading: confirmLoading,
            }}
            onCancel={() => {
              handleCancel(record.id);
            }}
          >
            <Button
              type="primary"
              danger
              ghost
              onClick={() => {
                showPopconfirm(record.id);
              }}
            >
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Joe Black",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Jim Green",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     age: 32,
  //     address: "London No. 2 Lake Park",
  //   },
  //   {
  //     key: "5",
  //     name: "Jim Red",
  //     age: 2,
  //     address: "London No. 2 Lake Park",
  //   },
  // ];

  return (
    <div>
      <Table columns={columns} dataSource={getData} scroll={{
      x: 'auto',
    }}/>
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
              <th colSpan={2} style={{textAlign:'center'}}>Dirección</th>
            </tr>
            <tr>
              <th>Calle</th>
              <td>{selectedRowData.address? selectedRowData.address.street: "No disponible"}</td>
            </tr>
            <tr>
              <th>Suite</th>
              <td>{selectedRowData.address? selectedRowData.address.suite: "No disponlible"}</td>
            </tr>
            <tr>
              <th>Ciudad</th>
              <td>{selectedRowData.address? selectedRowData.address.city: "No disponlible"}</td>
            </tr>
            <tr>
              <th>zip doce</th>
              <td>{selectedRowData.address? selectedRowData.address.zipcode: "No disponible"}</td>
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
              <th colSpan={2} style={{textAlign:'center'}}>Compañia</th>
            </tr>
            <tr>
              <th>nombre</th>
              <td>{selectedRowData.company? selectedRowData.company.name: "No disponible"}</td>
            </tr>
            <tr>
              <th>catchPhrase</th>
              <td>{selectedRowData.company? selectedRowData.company.catchPhrase: "No disponible"}</td>
            </tr>
            <tr>
              <th>bs</th>
              <td>{selectedRowData.company? selectedRowData.company.bs: "No disponible"}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </div>
  );
};
export default TableAnt;
