import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Button,
  Modal, Form, Alert, Table
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { adminUserService } from '../../services/userService';
import authService from '../../services/authService';

// Esquema de validación
const userSchema = yup.object({
  name: yup.string().required('Nombre es obligatorio'),
  email: yup.string().email('Email inválido').required('Email es obligatorio'),
  username: yup.string().optional(),
  password: yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .optional(),
  address: yup.string().optional(),
  birthdayDate: yup.date()
    .nullable()
    .transform((curr, orig) => orig === '' ? null : curr)
    .optional(),
  roleType: yup.string().required('Rol es obligatorio')
});

function AdminUserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userSchema)
  });

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [navigate]);

  useEffect(() => {
    if (isEditing && currentUser) {
      // Llenar todos los campos al editar, incluyendo username
      setValue('name', currentUser.name);
      setValue('email', currentUser.email);
      setValue('username', currentUser.username);
      setValue('address', currentUser.address || '');
      setValue('birthdayDate', currentUser.birthdayDate || '');
      setValue('roleType', currentUser.roleType);
    }
  }, [isEditing, currentUser, setValue]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await adminUserService.getAllUsers();
      setUsers(response);
      setLoading(false);
    } catch (err) {
      console.error('Error fetchUsers', err.response?.data || err.message);
      setError(err.response?.data?.message || 'No se pudieron cargar los usuarios');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  const onSubmit = async (data) => {
    try {
      const userCreateData = {
        name: data.name,
        email: data.email,
        username: isEditing ? currentUser.username : data.username,
        address: data.address || null,
        birthdayDate: data.birthdayDate ? new Date(data.birthdayDate).toISOString().split('T')[0] : null,
        roleType: data.roleType,
        ...(data.password ? { password: data.password } : {})
      };

      console.log('Datos del usuario:', userCreateData);

      if (isEditing) {
        await adminUserService.updateUser(currentUser.id, userCreateData);
      } else {
        userCreateData.email = data.email;
        userCreateData.username = data.username;
        await adminUserService.createUser(userCreateData);
      }
      fetchUsers();
      setShowModal(false);
      reset();
    } catch (err) {
      console.error('Error en submit', err);
      setError(err.response?.data?.message || 'No se pudo guardar el usuario');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await adminUserService.deleteUser(userId);
        fetchUsers();
      } catch (err) {
        console.error('Error eliminando usuario', err);
        setError(err.response?.data?.message || 'No se pudo eliminar el usuario');
      }
    }
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCreateNew = () => {
    setCurrentUser(null);
    setIsEditing(false);
    reset();
    setShowModal(true);
  };

  // Función para formatear el rol
  const formatRole = (roleType) => {
    switch(roleType) {
      case 'ADMIN': return 'Administrador';
      case 'EMPLOYEE': return 'Empleado';
      case 'CLIENT': return 'Cliente';
      default: return roleType;
    }
  };

  return (
    <Container fluid className="p-4">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Gestión de Usuarios</h2>
        </Col>
        <Col className="text-end">
          <Button
            variant="success"
            onClick={handleCreateNew}
            size="sm"
            className="me-2"
          >
            Crear Nuevo Usuario
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => navigate('/dashboard/admin')}
          >
            Regresar
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Fecha Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.address || 'N/A'}</td>
              <td>{user.email}</td>
              <td>{formatRole(user.roleType)}</td>
              <td>
                {user.birthdayDate
                  ? new Date(user.birthdayDate).toLocaleDateString()
                  : 'N/A'}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre *</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('name')}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                    disabled={isEditing}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Username *</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('username')}
                    isInvalid={!!errors.username}
                    disabled={isEditing}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Contraseña {!isEditing && '*'}</Form.Label>
                  <Form.Control
                    type="password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('address')}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha de Nacimiento</Form.Label>
                  <Form.Control
                    type="date"
                    {...register('birthdayDate')}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Rol *</Form.Label>
                  <Form.Select
                    {...register('roleType')}
                    isInvalid={!!errors.roleType}
                  >
                    <option value="">Seleccionar Rol</option>
                    <option value="ADMIN">Administrador</option>
                    <option value="EMPLOYEE">Empleado</option>
                    <option value="CLIENT">Cliente</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.roleType?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="primary">
              {isEditing ? 'Actualizar' : 'Crear'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default AdminUserManagement;