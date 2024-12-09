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
//import { productService } from '../../services/productService';
import { adminProductService } from '../../services/productService';

// Esquema de validación para productos
const productSchema = yup.object({
  name: yup.string().required('Nombre es obligatorio'),
  description: yup.string().optional(),
  price: yup.number()
    .positive('El precio debe ser positivo')
    .required('Precio es obligatorio'),
  stock: yup.number()
    .positive('El stock debe ser positivo')
    .integer('El stock debe ser un número entero')
    .required('Stock es obligatorio')
});

function AdminProductManagement() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(productSchema)
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (isEditing && currentProduct) {
      // Llenar todos los campos al editar
      setValue('name', currentProduct.name);
      setValue('description', currentProduct.description || '');
      setValue('price', currentProduct.price);
      setValue('stock', currentProduct.stock);
    }
  }, [isEditing, currentProduct, setValue]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await adminProductService.getAllProducts();
      setProducts(response);
      setLoading(false);
    } catch (err) {
      console.error('Error fetchProducts', err.response?.data || err.message);
      setError(err.response?.data?.message || 'No se pudieron cargar los productos');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Cargando productos...</div>;
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('description', data.description || '');
      formData.append('price', data.price);
      formData.append('stock', data.stock);

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (isEditing && currentProduct) {
        await adminProductService.updateProduct(currentProduct.id, formData);
      } else {
        await adminProductService.createProduct(formData);
      }

      fetchProducts();
      setShowModal(false);
      reset();
      setImageFile(null);
    } catch (err) {
      console.error('Error en submit', err);
      setError(err.response?.data?.message || 'No se pudo guardar el producto');
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await adminProductService.deleteProduct(productId);
        fetchProducts();
      } catch (err) {
        console.error('Error eliminando producto', err);
        setError(err.response?.data?.message || 'No se pudo eliminar el producto');
      }
    }
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleCreateNew = () => {
    setCurrentProduct(null);
    setIsEditing(false);
    reset();
    setShowModal(true);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleReturn = () => {
    navigate('/dashboard/admin');
  };

  return (
    <Container fluid className="p-4 mt-5">
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Gestión de Productos</h2>
        </Col>
        <Col className="text-end">
          <Button
            variant="success"
            onClick={handleCreateNew}
            size="sm"
            className="me-2"
          >
            Crear Nuevo Producto
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReturn}
          >
            Regresar
          </Button>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description || 'N/A'}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                {product.imageUrl ? (
                  <img
                    src={`${process.env.REACT_APP_API_URL}${product.imageUrl}`}
                    alt={product.name}
                    style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px'
                    }}
                    onError={(e) => {
                      e.target.src = '/default-product.jpg'; // Ruta a imagen por defecto
                    }}
                  />
                ) : (
                  <span>Sin imagen</span>
                )}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => handleEdit(product)}
                >
                  Editar
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
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
            {isEditing ? 'Editar Producto' : 'Crear Producto'}
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
                  <Form.Label>Precio *</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    {...register('price')}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.price?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Descripción</Form.Label>
                  <Form.Control
                    type="text"
                    {...register('description')}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Stock *</Form.Label>
                  <Form.Control
                    type="number"
                    {...register('stock')}
                    isInvalid={!!errors.stock}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.stock?.message}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Imagen</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
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

export default AdminProductManagement;