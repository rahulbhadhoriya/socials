import { useState } from "react";
import "./App.scss";
import { Item } from "./@types/App";
import { userList } from "./common/mock-data";
import User from "./components/User";

function App() {
  const [users, setUsers] = useState<Item[]>(userList);

  return (
    <div className="container">
      <div className="user-list">
        {users.map((user) => (
          <User key={user.id} {...user}  />
        ))}
      </div>
    </div>
  );
}

export default App;
