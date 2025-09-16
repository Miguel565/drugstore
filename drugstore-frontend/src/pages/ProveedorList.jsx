import { Card, Container, Table, Button, Modal, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState } from "react";
import { createProveedor, deleteProveedor } from "../reducers/proveedorReducer";
import Swal from 'sweetalert2';
import swalContent from 'sweetalert2-react-content';
import { useEffect } from 'react'
import { initializeProveedores } from '../reducers/proveedorReducer'

const ProveedorList = () => {
    const proveedores = useSelector(state => state.proveedores);
    const dispatch = useDispatch();
    const MySwal = swalContent(Swal);

    useEffect(() => {
        dispatch(initializeProveedores())
    }, [dispatch])

    const initialForm = {
        tipo_identificacion: '',
        numero_identificacion: '',
        razon_social: '',
        direccion: '',
        nombre_contacto: '',
        celular_contacto: '',
        email: '',
        actividad_economica: ''
    }

    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOpenModal = () => {
        setForm(initialForm);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        dispatch(createProveedor(form));
        setIsSubmitting(false);
        setShowModal(false)
        MySwal.fire({
            title: '¡Success!',
            text: 'Producto agregado con exito',
            icon: 'success',
            timer: 2000
        })
    };

    const handleDelete = (proveedor) => {
        MySwal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar al proveedor ${proveedor.razonSocial}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProveedor(proveedor.id));
                MySwal.fire('Eliminado', 'El proveedor ha sido eliminado.', 'success');
            }
        });
    };

    return (
        <Container className="py-4">
            <Card>
                <Card.Body>
                    <h1 className="mb-3">Proveedores</h1>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Tipo de Identidad</th>
                                    <th>Número de Identidad</th>
                                    <th>Razón Social / Nombre</th>
                                    <th>Dirección</th>
                                    <th>Nombre Contacto</th>
                                    <th>Número de Celular</th>
                                    <th>Correo Electronico</th>
                                    <th>Actividad Económica</th>
                                    <th className="text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(!proveedores || proveedores.length === 0) ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">No hay proveedores disponibles</td>
                                    </tr>
                                ) : (proveedores?.map(proveedor => (
                                    <tr key={proveedor.id}>
                                        <td>{proveedor.tipo_identificacion}</td>
                                        <td>{proveedor.numero_identificacion}</td>
                                        <td>{proveedor.razon_social}</td>
                                        <td>{proveedor.direccion}</td>
                                        <td>{proveedor.nombre_contacto}</td>
                                        <td>{proveedor.celular_contacto}</td>
                                        <td>{proveedor.email}</td>
                                        <td>{proveedor.actividad_economica}</td>
                                        <td className="text-center" width="15%">
                                            <Link
                                                to={`/proveedores/${proveedor.id}`}
                                                className="btn btn-primary px-4 py-2 fs-6 me-2"
                                                size="lg"
                                                aria-label="Editar producto"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <Button
                                                variant="danger"
                                                className="px-4 py-2 fs-6"
                                                size="lg"
                                                onClick={() => handleDelete(proveedor)}
                                                aria-label="Eliminar proveedor"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </Button>
                                        </td>
                                    </tr>)
                                )
                                )}
                            </tbody>
                        </Table>
                    </div>
                    <Button variant="success" className="mt-3" onClick={handleOpenModal}>
                        <i className="fas fa-plus"></i> Agregar Proveedor
                    </Button>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Proveedor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Tipo de Identidad</Form.Label>
                            <Form.Select
                                name="tipo_identificacion"
                                value={form.tipo_identificacion}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Seleccione...</option>
                                <option value="dni">DNI</option>
                                <option value="cedula">Cédula</option>
                                <option value="pasaporte">Pasaporte</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de Identidad</Form.Label>
                            <Form.Control
                                type="text"
                                name="numero_identificacion"
                                value={form.numero_identificacion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Razón Social/Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="razon_social"
                                value={form.razon_social}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="text"
                                name="direccion"
                                value={form.direccion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre Contacto</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre_contacto"
                                value={form.nombre_contacto}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Número de Celular</Form.Label>
                            <Form.Control
                                type="text"
                                name="celular_contacto"
                                value={form.celular_contacto}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Correo Electronico</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Actividad Económica</Form.Label>
                            <Form.Control
                                type="text"
                                name="actividad_economica"
                                value={form.actividad_economica}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    );
};

export default ProveedorList;