import React, { useState, useEffect } from 'react';
import {
  Container, Row, Col, Card, Button,
  Modal, Form, Alert, Spinner
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../services/userService';
import authService from '../../services/authService';

// Esquema de validación para crear/editar usuarios
const userSchema = yup.object({
  name: yup.string().required('Nombre es obligatorio'),
  email: yup.string().email('Email inválido').required('Email es obligatorio'),
  username: yup.string().required('Username es obligatorio'),
  password: yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('Contraseña es obligatoria'),
  address: yup.string().optional(),
  birthdayDate: yup.date().optional(),
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
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userSchema)
  });

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetchUsers', err);
      setError('No se pudieron cargar los usuarios');
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (isEditing) {
        await userService.updateUser(currentUser.id, data);
      } else {
        await userService.createUser(data);
      }
      fetchUsers();
      setShowModal(false);
      reset();
    } catch (err) {
      console.error('Error en submit', err);
      setError('No se pudo guardar el usuario');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await userService.deleteUser(userId);
        fetchUsers();
      } catch (err) {
        console.error('Error eliminando usuario', err);
        setError('No se pudo eliminar el usuario');
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
    setShowModal(true);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container fluid className="p-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Gestión de Usuarios</h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={handleCreateNew}>
            Crear Nuevo Usuario
          </Button>
        </Col>
      </Row>

      <Row xs={1} md={3} className="g-4">
        {users.map(user => (
          <Col key={user.id}>
            <Card>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email}<br/>
                  <strong>Username:</strong> {user.username}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="warning"
                    size="sm"
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
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para crear/editar usuarios */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditing ? 'Editar Usuario' : 'Crear Usuario'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {/* Campos del formulario con validaciones */}
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                {...register('name')}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {/* Más campos similares para email, username, etc. */}
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