import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    birthdayDate: '',
    roleId: '' // Cambia de "role" a "roleId" para asignar el ID del rol
  });

  const [editingUser, setEditingUser] = useState(null); // Estado para manejar la edición
  const [loading, setLoading] = useState(true); // Estado para manejar la carga de usuarios
  const [errorMessage, setErrorMessage] = useState(''); // Estado para manejar mensajes de error

  // Obtener lista de usuarios desde el backend
  useEffect(() => {
    fetch('http://localhost:8080/users/all')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener usuarios');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
        setLoading(false); // Indica que la carga ha terminado
      })
      .catch(error => {
        setErrorMessage('Error al obtener usuarios');
        console.error('Error al obtener usuarios:', error);
        setLoading(false); // Termina la carga incluso si hay un error
      });
  }, []);

  // Función para crear un nuevo usuario
  const createUser = async () => {
    if(!newUser.name || !newUser.email || !newUser.password){
        alert('por favor, completa todos los campos');
        return;
    }
    try {
      const response = await fetch(`http://localhost:8080/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]);
        setNewUser({
          name: '',
          email: '',
          password: '',
          address: '',
          birthdayDate: '',
          roleId: '' // Resetea el campo roleId
        });
      } else {
        console.error('Error al crear usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Función para eliminar un usuario
  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/delete/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
      } else {
        console.error('Error al eliminar usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Función para preparar la edición de un usuario
  const startEditing = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      password: '',
      address: user.address,
      birthdayDate: user.birthdayDate,
      roleId: user.role ? user.role.id : '' // Preselecciona el rol actual en el formulario
    });
  };

  // Función para editar un usuario
  const editUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/users/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const updatedData = await response.json();
        setUsers(users.map(user => (user.id === id ? updatedData : user)));
        setEditingUser(null); // Resetea el estado de edición
        setNewUser({
          name: '',
          email: '',
          password: '',
          address: '',
          birthdayDate: '',
          roleId: '' // Resetea el formulario después de editar
        });
      } else {
        console.error('Error al editar usuario');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };

  // Renderizado de la UI
  return (
    <div className="admin-dashboard">
      <h1 className="title">Panel de Administración</h1>

      {/* Muestra un mensaje de carga */}
      {loading ? (
        <p>Cargando usuarios...</p>
      ) : errorMessage ? (
        // Muestra un mensaje de error si ocurrió un problema
        <p>{errorMessage}</p>
      ) : (
        <>
          <div className="form-container">
            <h2>{editingUser ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}</h2>
            <form
              className="user-form"
              onSubmit={(e) => {
                e.preventDefault();
                editingUser ? editUser(editingUser.id) : createUser(); // Decide si editar o crear
              }}
            >
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  className="input-field"
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="input-field"
                />
              </div>

              <div className="form-row">
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="input-field"
                />
                <input
                  type="text"
                  placeholder="Dirección"
                  value={newUser.address}
                  onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="form-row">
                <input
                  type="date"
                  placeholder="Fecha de Nacimiento"
                  value={newUser.birthdayDate}
                  onChange={(e) => setNewUser({ ...newUser, birthdayDate: e.target.value })}
                  className="input-field"
                />
                <select
                  value={newUser.roleId}
                  onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
                  className="input-field"
                >
                  <option value="">Seleccionar Rol</option>
                  <option value="1">Administrador</option>
                  <option value="2">Empleado</option>
                  <option value="3">Cliente</option>
                </select>
              </div>

              <button type="submit" className="btn submit-btn">
                {editingUser ? 'Guardar Cambios' : 'Agregar Usuario'}
              </button>
            </form>
          </div>

          <div className="user-list-container">
            <h2>Lista de Usuarios</h2>
            <ul className="user-list">
              {users.map(user => (
                <li key={user.id} className="user-item">
                  {user.name} ({user.email}) - {user.role ? user.role.name : 'Sin rol'}
                  <div className="action-buttons">
                    <button className="btn edit-btn" onClick={() => startEditing(user)}>
                      Editar
                    </button>
                    <button className="btn delete-btn" onClick={() => deleteUser(user.id)}>
                      Eliminar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;