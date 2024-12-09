import React, { useState } from 'react';
import './styles/Registrarse.css';
import { useNavigate } from 'react-router-dom';

function Registrarse() {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    address: '',
    birthdayDate: '',
    password: '',
    roleType: 'CLIENT'
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Declaración de useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault();

    try {

      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al registrarse');
      }

      await response.json();

      alert('Registro exitoso, ahora puedes iniciar sesión');
      navigate('/login');

    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error al registrarse: ' + error.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Crear una nueva cuenta</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nombre de Usuario:</label> {/* campo para username */}
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Dirección:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            name="birthdayDate"
            value={formData.birthdayDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registrarse;