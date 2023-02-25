import { useState } from "react";
import UserForm from "./form/UserForm";
import IconButton from "./userTable/components/IconButton";
import UserTable from "./userTable/UserTable";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(null);
  const data = {
    headerItems: [
      { name: "Id", width: "7%" },
      { name: "Nombre", width: "30%" },
      { name: "email", width: "40%" },
      { name: "Opciones", width: "20%" },
    ],
    rows: [
      { id: 1, name: "Ian Rosas", email: "ian@gmail.com" },
      { id: 2, name: "Adriel Rosas", email: "ian@gmail.com" },
      { id: 3, name: "Aziel Eduardo", email: "ian@gmail.com" },
    ],
  };
  const handleAdd = () => {
    setShowForm(true);
    setIsEditing(false);
  };

  const onSubmit = (data) => {
    console.log(data);
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
      />
    </div>
  );
}

export default App;
