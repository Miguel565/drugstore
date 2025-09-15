import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import swalContent from 'sweetalert2-react-content'
import { useDispatch, useSelector } from 'react-redux'
import { createRegistro, deleteRegistro } from '../reducers/registroReducer'
import { Card, Container, Table, Button, Modal, Form } from "react-bootstrap";

const RegistroList = () => {

    const initialForm = {
        fechaRegistro: '',
        producto: '',
        proveedor: '',
        factura: '',
        cantidad: 0,
        lote: '',
        registroInvima: '',
        fechaVencimiento: '',
        descripcion: ''
    }
    const registros = useSelector(state => state.registros)
    const dispatch = useDispatch()
    const MySwal = swalContent(Swal)
    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState(initialForm)
    const [formError, setFormError] = useState('')

    const handleOpenModal = () => {
        setForm(initialForm)
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

        if (!form.fechaRegistro || !form.producto || !form.proveedor
            || !form.factura || !form.cantidad || !form.lote
            || !form.registroInvima || !form.fechaVencimiento || !form.descripcion) {
            setFormError('Todos los campos son obligatorios.')
            return
        }
        dispatch(createRegistro(form))
        setShowModal(false)
        MySwal.fire({
            title: '¡Success!',
            text: 'Producto agregado con exito',
            icon: 'success',
            timer: 2000
        })
    }

    useEffect(() => {
        document.title = 'Drugstore|Registro'
    })

    const handleDelete = (registro) => {
        MySwal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar el registro de "${registro.producto}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteRegistro(registro));
                MySwal.fire({
                    title: 'Eliminado',
                    text: 'El registro ha sido eliminado.',
                    icon: 'success',
                    timer: 2000
                })
            }
        })
    }

    return (
        <>
            <Container className="py-4">
                <Card>
                    <Card.Body>
                        <h1 className="mb-3">Registrados</h1>
                        <div className="table-responsive tw-max-h-96">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>FECHA RECEPCION</th>
                                        <th>PRODUCTO</th>
                                        <th>PROVEEDOR</th>
                                        <th>FACTURA</th>
                                        <th>CANTIDAD</th>
                                        <th>REGISTRO INVIMA</th>
                                        <th>LOTE</th>
                                        <th>FECHA VENCE</th>
                                        <th className="text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registros?.map(registro => (
                                        <tr key={registro.id}>
                                            <td>{registro.fechaRegistro}</td>
                                            <td>{registro.producto}</td>
                                            <td>{registro.proveedor}</td>
                                            <td>{registro.factura}</td>
                                            <td>{registro.cantidad}</td>
                                            <td>{registro.registroInvima}</td>
                                            <td>{registro.lote}</td>
                                            <td>{registro.fechaVencimiento}</td>
                                            <td className="text-center">
                                                <Link
                                                    to={`/registros/${registro.id}`}
                                                    className="btn btn-primary mr-2"
                                                    aria-label="Editar producto"
                                                >
                                                    <i className="fas fa-edit"></i>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(registro)}
                                                    className="btn btn-danger"
                                                    aria-label="Eliminar producto"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </Card.Body>
                </Card>
                <button className="btn btn-success mt-3" onClick={handleOpenModal}>
                    <i className="fas fa-plus"></i> Agregar Registro
                </button>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Agregar Registro</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {formError && <div className="alert alert-danger">{formError}</div>}
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Registro</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaRegistro"
                                    value={form.fechaRegistro}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Producto</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="producto"
                                    value={form.producto}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Proveedor</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="proveedor"
                                    value={form.proveedor}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Número de Factura</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="factura"
                                    value={form.factura}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control
                                    type="number"
                                    name="cantidad"
                                    value={form.cantidad}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Lote</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lote"
                                    value={form.lote}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Registro Invima</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="registroInvima"
                                    value={form.registroInvima}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Fecha de Vencimiento</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="fechaVencimiento"
                                    value={form.fechaVencimiento}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Descripción</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="descripcion"
                                    value={form.descripcion}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </Container>
        </>
    )
}

export default RegistroList