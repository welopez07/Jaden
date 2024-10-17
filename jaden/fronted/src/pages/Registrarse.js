import React, { useState } from 'react';
import './Registrarse.css';
import { useNavigate } from 'react-router-dom';

function Registrarse() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [birthdayDate, setBirthdayDate] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Declaración de useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { name, username, address, birthdayDate, password };

    try {
      const response = await fetch('http://localhost:8080/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        alert('Registro exitoso, ahora puedes acceder como cliente');
        navigate('/dashboard/user'); // Redirige al dashboard de cliente
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al registrarse');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      setError('Error al registrarse: ' + error.message);
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
          <label>Nombre de Usuario:</label> {/* campo para username */}
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          <label>Dirección:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Fecha de Nacimiento:</label>
          <input
            type="date"
            value={birthdayDate}
            onChange={(e) => setBirthdayDate(e.target.value)}
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Registrarse;