import React, { useState } from "react";
import { Input } from "antd";
import axios from "axios";
import { API_URL } from "../../../constants";
const { Search } = Input;


const SelectPerson = ({fed,setPerson}) => {

  const [getData, setGetData] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (dni) => {
    const storedUser = localStorage.getItem("user");
    const storedUserParse = JSON.parse(storedUser);
    setLoading(true)
    let token = "";
    if (storedUserParse) {
      token = storedUserParse.token;
      console.log(token);
    }
    try {
      const response = await axios.get(`${API_URL}/api/person/${dni}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response)
      if(response.data.data){
        setGetData(response.data.data);
        if(fed){
          setPerson(response.data.data)
        }
        setLoading(false)
      }
    } catch (error) {
      console.error("Hubo un error al obtener los datos:", error);
      setLoading(false)
    }
    console.log(getData)
    setLoading(false)
  };

  return (
    <>
      <Search
        placeholder="DNI"
        onChange={(e) => {
          e.target.value.length == 8 ? fetchData(e.target.value) : setGetData("");
        }}
        loading={loading}
      />
      <br />
     <br />
      <Input value={getData&&`${getData.first_name} ${getData.last_name}`}></Input>
    </>
  );
};
export default SelectPerson;
