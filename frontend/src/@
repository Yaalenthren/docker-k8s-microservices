import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));

    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Microservices Demo</h1>
      <h2>Users</h2>
      <ul>{users.map(u => <li key={u.id}>{u.name}</li>)}</ul>
      <h2>Products</h2>
      <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </div>
  );
}

export default App;
