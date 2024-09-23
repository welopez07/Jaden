import React, { useState } from 'react';
import './Registrarse.css'; // Estilos específicos para este formulario

function Registrarse() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, email, password, role };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        // Redirigir a la página de inicio de sesión o mostrar un mensaje de éxito
        alert('Registro exitoso, ahora puedes iniciar sesión');
        window.location.href = '/login';
      } else {
        alert('Error al registrarse');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
    }
  };

  return (
    <div className="register-container">
      <h1>Registrarse</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Rol:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Selecciona un rol</option>
            <option value="admin">Administrador</option>
            <option value="employee">Empleado</option>
            <option value="client">Cliente</option>
          </select>
        </div>
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registrarse;