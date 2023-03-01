import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./form/UserForm";
import IconButton from "./userTable/components/IconButton";
import UserTable from "./userTable/UserTable";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(null);
  const [data, setData] = useState({
    headerItems: [
      { name: "Id", width: "7%" },
      { name: "Nombre", width: "30%" },
      { name: "email", width: "40%" },
      { name: "Opciones", width: "20%" },
    ],
    rows: [],
  });

  useEffect(() => {
    axios.get("http://localhost:8000/api/v1/users").then((response) => {
      console.log(response);
      setData({ headerItems: [...data.headerItems], rows: [...response.data] });
    });
  }, []);

  const handleAdd = () => {
    setShowForm(true);
    setIsEditing(false);
  };

  const onSubmit = (obj) => {
    console.log(obj);
    axios.post("http://localhost:8000/api/v1/users", obj).then((res) => {
      axios.get("http://localhost:8000/api/v1/users").then((response) => {
        setData({
          headerItems: [...data.headerItems],
          rows: [...response.data],
        });
      });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/v1/users/${id}`).then((res) => {
      axios.get("http://localhost:8000/api/v1/users").then((response) => {
        setData({
          headerItems: [...data.headerItems],
          rows: [...response.data],
        });
      });
    });
  };

  return (
    <div className="App">
      <IconButton type="add" color="#278D99" action={handleAdd} />
      {showForm && (
        <UserForm
          setShowForm={setShowForm}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          value={value}
          setValue={setValue}
          onSubmit={onSubmit}
        />
      )}
      <UserTable
        data={data}
        setIsEditing={setIsEditing}
        showForm={setShowForm}
        setValue={setValue}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
