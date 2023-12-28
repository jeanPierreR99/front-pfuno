import React, { useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { Button, Input, Modal, Select } from "antd";
import axios from "axios";
import { API_URL, ROLE } from "../../constants";
import SelectDependency from "./select/SelectDependency";
import SelectPerson from "./select/SelectPerson";
import SelectRole from "./select/SelectRole";
import SelectStaff from "./select/SelectStaff";

const ModalAddRole = ({ openModal, setOpenModal, fetchData }) => {
  const [person, setPerson] = useState("");
  const [dependency, setDependency] = useState("");
  const [role, setRole] = useState("");
  const [staff, setStaff] = useState("");
  const [email, setEmail] = useState("");

  const handleEvenst = async () => {
    const dataREs = {
      email,
      active: true,
      role_name: role,
      staff,
      id_dependency: dependency,
      person,
    };

    const storedUser = localStorage.getItem("user");
    const storedUserParse = JSON.parse(storedUser);
    let token = "";
    if (storedUserParse) {
      token = storedUserParse.token;
      console.log(token);
    }

    try {
      const response = await axios.post(`${API_URL}/api/users`, dataREs, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      if (response.data) {
        fetchData();
        setPerson("") 
        setDependency("") 
        setRole("") 
        setStaff("") 
        setEmail("") 
        setOpenModal(false);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Modal
      title="Nuevo usuario"
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
          <span>Persona</span>
          <SelectPerson fed={34} setPerson={setPerson}></SelectPerson>
        </div>
        <div className="modal-group">
          <span>Email</span>
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="modal-group">
          <span>Depenedencia</span>
          <SelectDependency setDependency={setDependency}></SelectDependency>
        </div>
        <div className="modal-group">
          <span>Rol</span>
          <SelectRole setRole={setRole}></SelectRole>
        </div>
        <div className="modal-group">
          <span>Staff</span>
          <SelectStaff setStaff={setStaff}></SelectStaff>
        </div>
        <div className="modal-group">
          <span>Estado</span>
          <Select
            style={{
              width: "100%",
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
        </div>
        <div className="modal-group">
          <Button
            type="primary"
            onClick={() => {
              handleEvenst();
            }}
          >
            agregar
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ModalAddRole;
