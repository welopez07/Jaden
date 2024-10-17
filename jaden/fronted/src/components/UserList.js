import React, { useEffect, useState } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/users') // Endpoint o ruta para acceder al backend
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching users:', error));
  }, []);
  // Método para borrar un usuario
  const deleteUser = async (id) => {
    await fetch(`/users/${id}`, { method: 'DELETE' });
    setUsers(users.filter(user => user.id !== id)); // Actualiza la lista
  };

  // Método para editar
  const editUser = async (id, updatedUser) => {
    const response = await fetch(`/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify(updatedUser),
    });
    const data = await response.json();
    setUsers(users.map(user => (user.id === id ? data : user))); // Actualiza la lista
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;