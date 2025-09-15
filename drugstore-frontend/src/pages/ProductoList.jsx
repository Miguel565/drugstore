import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProducto, deleteProducto } from '../../reducers/productoReducer'
import { Card, Container, Table, Button, Modal, Form } from "react-bootstrap"
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import swalContent from 'sweetalert2-react-content'

const ProductoList = () => {
    const productos = useSelector(state => state.productos)
    const dispatch = useDispatch()
    const MySwal = swalContent(Swal)

    const initialForm = {
        codigo: '',
        nombre: '',
        estado: '',
        laboratorio: '',
        registro: '',
        vence: '',
        cantidad: 0,
    }

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
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación
        if (!form.codigo || !form.nombre || !form.estado || !form.vence
            || !form.registro || !form.cantidad || !form.laboratorio) {
            setFormError('Todos los campos son obligatorios.')
            return;
        }
        dispatch(createProducto(form))
        setShowModal(false)
        MySwal.fire({
            title: '¡Success!',
            text: 'Producto agregado con exito',
            icon: 'success',
            timer: 2000
        })
    }

    const handleDelete = (producto) => {
        MySwal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas eliminar el producto "${producto.nombre}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProducto(producto));
                MySwal.fire({
                    title: 'Eliminado',
                    text: 'El producto ha sido eliminado.',
                    icon: 'success',
                    timer: 2000
                })
            }
        })
    }

    return (
        <Container className="py-4">
            <Card>
                <Card.Body>
                    <h1 className="mb-3">Proveedores</h1>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr className="tw-text-gray-700">
                                    <th width="10%">Codigo</th>
                                    <th width="15%">Nombre</th>
                                    <th width="11%">Estado</th>
                                    <th width="11%">Fecha Registro</th>
                                    <th width="10%">Fecha Vence</th>
                                    <th width="8%">Stock</th>
                                    <th width="12%">Laboratorio</th>
                                    <th className="text-center">
                                        <i className="fas fa-cog"></i>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {!productos || productos.length === 0 ? (
                                    <tr>
                                        <td colSpan="8" className="text-center">No hay productos disponibles</td>
                                    </tr>
                                ) : (productos?.map(producto =>
                                    <tr key={producto.id}>
                                        <td>{producto.codigo}</td>
                                        <td>{producto.nombre}</td>
                                        <td>{producto.estado}</td>
                                        <td>{producto.registro}</td>
                                        <td>{producto.vence}</td>
                                        <td>{producto.cantidad}</td>
                                        <td>{producto.laboratorio}</td>
                                        <td className="text-center">
                                            <Link
                                                to={`/producto/${producto.id}`}
                                                className="btn btn-primary mr-2"
                                                aria-label="Editar producto"
                                            >
                                                <i className="fas fa-edit"></i>
                                            </Link>
                                            <button
                                                onClick={() =>
                                                    handleDelete(producto)
                                                }
                                                className="btn btn-danger"
                                                aria-label="Eliminar producto"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>))}
                            </tbody>
                        </Table>
                    </div>
                    <button className="btn btn-success mt-3" onClick={handleOpenModal}>
                        <i className="fas fa-plus"></i> Agregar Producto
                    </button>
                </Card.Body>
            </Card>
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Agregar Producto</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Cerrar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {formError && <div className="alert alert-danger">{formError}</div>}
                                    <div className="form-group">
                                        <label>Código</label>
                                        <input type="text" className="form-control" name="codigo" value={form.codigo} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Nombre</label>
                                        <input type="text" className="form-control" name="nombre" value={form.nombre} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Estado</label>
                                        <input type="text" className="form-control" name="estado" value={form.estado} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha Registro</label>
                                        <input type="date" className="form-control" name="registro" value={form.registro} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>FECHA VENCE</label>
                                        <input type="date" className="form-control" name="vence" value={form.vence} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>LABORATORIO</label>
                                        <input type="text" className="form-control" name="laboratorio" value={form.laboratorio} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Cantidad</label>
                                        <input type="number" className="form-control" name="cantidad" value={form.cantidad} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </Container>
    )
}

export default ProductoList