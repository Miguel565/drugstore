import { useDispatch } from "react-redux"
import { Card, Container, Table, Button, Modal, Form } from "react-bootstrap";
import { modifyProveedor } from "../reducers/proveedorReducer"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'
import swalContent from 'sweetalert2-react-content'
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useState } from "react"

const Proveedor = () => {
    const { id } = useParams();
    const proveedor = useSelector(state =>
        state.proveedores.find(p => p.id === Number(id))
    );
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const MySwal = swalContent(Swal)
    const [showModal, setShowModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formError, setFormError] = useState('')
    const [form, setForm] = useState({})

    const handleOpenModal = () => {
        setForm({
            tipo_identificacion: proveedor.tipo_identificacion || '',
            numero_identificacion: proveedor.numero_identificacion || '',
            razon_social: proveedor.razonSocial || '',
            direccion: proveedor.direccion || '',
            nombre_contacto: proveedor.nombre_contacto || '',
            celular_contacto: proveedor.celular_contacto || '',
            email: proveedor.email || '',
            actividad_economica: proveedor.actividad_economica || ''
        })
        setFormError('')
        setShowModal(true)
    }

    const handleCloseModal = () => {
        setShowModal(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!form.tipoIdentidad || !form.numeroIdentidad || !form.direccion
            || !form.nombreContacto || !form.numeroCelular || !form.email || !form.actividadEconomica) {
            setFormError('Todos los campos son obligatorios.')
            return
        }
        setIsSubmitting(true)
        dispatch(modifyProveedor(proveedor.id, form))
        setIsSubmitting(false)
        setShowModal(false)
        MySwal.fire({
            title: '¡Actualizado!',
            text: 'Producto actualizado con éxito',
            icon: 'success',
            timer: 2000
        })
        navigate('/proveedores')
    }

    return (
        <Container className="py-4">
            <Card>
                <Card.Body>
                    <h2>Detalle del Proveedor</h2>
                    <h3>{proveedor.razon_social}</h3>
                    <p>{proveedor.tipo_identificacion}: {proveedor.numero_identificacion}</p>
                    <p>Contacto: {proveedor.nombre_contacto}</p>
                    <p>Numero Celular: {proveedor.celular_contacto} </p>
                    <p>Dirección: {proveedor.direccion} </p>
                    <p>Correo Electronico: {proveedor.email}</p>
                    <p>Actividad Economica: {proveedor.actividad_economica}</p>
                    <Button variant="warning" className="mt-3" onClick={handleOpenModal}>
                        <i className="fas fa-edit"></i> Editar Proveedor
                    </Button>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar Proveedor</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {formError && <div className="alert alert-danger">{formError}</div>}
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
                            <Form.Label>Razón Social/NOMBRE</Form.Label>
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
                            Guardar Cambios
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </Container>
    )
}

export default Proveedor