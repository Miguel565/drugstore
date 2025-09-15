import { useDispatch } from 'react-redux'
import { modifyProducto } from '../reducers/productoReducer'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import swalContent from 'sweetalert2-react-content'

import { useState } from 'react'

const Producto = ({ producto }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const MySwal = swalContent(Swal)

    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({})
    const [formError, setFormError] = useState('')

    const handleOpenModal = () => {
        setForm({
            nombre: producto.nombre || '',
            estado: producto.estado || '',
            cantidad: producto.cantidad || 0,
            registo: producto.registo || '',
            laboratorio: producto.laboratorio || '',
            descripcion: producto.descripcion || ''
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
        if (!form.nombre || !form.estado || !form.registo || !form.cantidad || !form.laboratorio) {
            setFormError('Todos los campos son obligatorios.')
            return
        }
        dispatch(modifyProducto(producto.id, form))
        setShowModal(false)
        MySwal.fire({
            title: '¡Actualizado!',
            text: 'Producto actualizado con éxito',
            icon: 'success',
            timer: 2000
        })
        navigate('/productos')
    }

    return (
        <>
            <div className="section-body">
                <div className="card">
                    <div className="card-body px-0">
                        <h2>Detalle del producto</h2>
                        <h3>{producto.nombre}</h3>
                        <p>Estado: {producto.estado}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Laboratorio: {producto.laboratorio}</p>
                        <p>Fecha : {producto.registo}</p>
                        <p>Vence: {producto.vence}</p>
                        <p className="px-4">
                            Descripcion: {producto.descripcion}
                        </p>
                        <button className="btn btn-warning mt-3" onClick={handleOpenModal}>
                            <i className="fas fa-edit"></i> Editar Producto
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Producto</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Cerrar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {formError && <div className="alert alert-danger">{formError}</div>}
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
                                        <input type="date" className="form-control" name="registo" value={form.registo} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>LABORATORIO</label>
                                        <input type="text" className="form-control" name="laboratorio" value={form.laboratorio} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Cantidad</label>
                                        <input type="number" className="form-control" name="cantidad" value={form.cantidad} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Descripción</label>
                                        <textarea className="form-control" name="descripcion" value={form.descripcion} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                                    <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Producto