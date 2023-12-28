import React, { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { Select, Spin } from "antd";
import { API_URL } from "../../../constants";
import axios from "axios";
function DebounceSelect({ fetchOptions, debounceTimeout = 800, ...props }) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setOptions([]);
      setFetching(true);
      fetchOptions(value).then((newOptions) => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }
        setOptions(newOptions);
        setFetching(false);
      });
    };
    return debounce(loadOptions, debounceTimeout);
  }, [fetchOptions, debounceTimeout]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
      options={options}
    />
  );
}

async function fetchUserList(username) {
  console.log("fetching user", username);
  try {
    const storedUser = localStorage.getItem("user");
    const storedUserParse = JSON.parse(storedUser);
    let token = "";
    if (storedUserParse) {
      token = storedUserParse.token;
      console.log(token);
    }

    const response = await axios.get(`${API_URL}/api/users/list/roles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data)
    return response.data.data.map((role) => ({
      label: `${role.name}`,
      value: role.id,
    }));
  } catch (error) {
    console.error("Hubo un error al obtener los datos:", error);
  }
}
const SelectRole = ({setRole}) => {
  const [value, setValue] = useState("");

  return (
    <DebounceSelect
      mode="multiple"
      value={value}
      placeholder="Seleciona el campus"
      fetchOptions={fetchUserList}
      onChange={(newValue) => {
        if (Array.isArray(newValue)) {
          setValue(newValue[1].key);
          setRole(newValue[1].key)
          console.log(value)
        } else {
          setValue(newValue[1]);
        }
      }}
      style={{
        width: "100%",
      }}
    />
  );
};
export default SelectRole;
