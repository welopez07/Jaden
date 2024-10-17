import React, { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envía los datos del login
      });

      const data = await response.json();

      if (data.success) {
        const userRole = data.role;
        switch (userRole) {
          case 'admin':
            window.location.href = '/dashboard/admin';
            break;
          case 'employee':
            window.location.href = '/dashboard/employee';
            break;
          case 'client':
            window.location.href = '/dashboard/user';
            break;
          default:
            alert('Rol no reconocido');
            break;
        }
      } else {
        alert('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error en el login:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(); // Llama a la función de login cuando el formulario se envía
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form className="login-form" onSubmit={handleSubmit}>
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
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
}

export default Login;