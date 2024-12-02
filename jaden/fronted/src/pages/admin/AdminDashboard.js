import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Row, Col, Card, Button,
  Alert, Spinner
} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import authService from '../../services/authService';
import dashboardService from '../../services/dashboardService';

function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Verificar autenticación
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Obtener usuario actual
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);

    // Cargar estadísticas
    fetchDashboardStats();
  }, [navigate]);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      // Reemplazar con tu servicio real de estadísticas
      const response = await dashboardService.getDashboardStats();
      setStats(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard stats', error);
      setError('No se pudieron cargar las estadísticas');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
    }
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="p-4">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1>Panel de Administración</h1>
          {user && <p>Bienvenido, {user.name}</p>}
        </Col>
        <Col className="text-end">
          <Button variant="danger" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Col>
      </Row>

      <Row className="g-4">
        {/* Tarjetas de estadísticas */}
        {[
          {
            title: "Usuarios",
            value: stats.totalUsers,
            bg: "primary"
          },
          {
            title: "Pedidos",
            value: stats.totalOrders,
            bg: "success"
          },
          {
            title: "Productos",
            value: stats.totalProducts,
            bg: "warning"
          },
          {
            title: "Ingresos",
            value: `$${stats.totalRevenue.toFixed(2)}`,
            bg: "info"
          }
        ].map((stat, index) => (
          <Col md={3} key={index}>
            <Card bg={stat.bg} text="white" className="text-center">
              <Card.Body>
                <Card.Title>{stat.title}</Card.Title>
                <Card.Text className="display-6">{stat.value}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-4">
        <Col>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            {[
              {
                label: "Gestión de Usuarios",
                path: "/dashboard/admin/users",
                variant: "primary"
              },
              {
                label: "Gestión de Productos",
                path: "/dashboard/admin/products",
                variant: "secondary"
              },
              {
                label: "Gestión de Pedidos",
                path: "/dashboard/admin/orders",
                variant: "info"
              }
            ].map((menu, index) => (
              <Button
                key={index}
                variant={menu.variant}
                className="me-md-2"
                onClick={() => navigate(menu.path)}
              >
                {menu.label}
              </Button>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminDashboard;