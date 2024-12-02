import React, { useState } from 'react';
import './styles/Login.css';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envía los datos del login
      });

      if (!response.ok) {
        const errorText = await response.text();
        setError(errorText || 'Error al iniciar sesión');
        return;
      }

      const data = await response.json();
      console.log('Datos de respuesta:', data);

      // Guardar token y roles
      localStorage.setItem('token', data.token);
      localStorage.setItem('roles', JSON.stringify(data.roles));

      // Redirección basada en roles
      if (data.roles.includes('ROLE_ADMIN')) {
        navigate('/dashboard/admin');
      } else if (data.roles.includes('ROLE_EMPLOYEE')) {
        navigate('/dashboard/employee');
      } else if (data.roles.includes('ROLE_CLIENT')) {
        navigate('/dashboard/user');
      } else {
        throw new Error('Rol no reconocido');
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      setError(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleLogin}>
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;