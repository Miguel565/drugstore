import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import swalContent from 'sweetalert2-react-content'
import  { updateRegistro } from '../reducers/registroReducer'

import { useState } from 'react'

const Registro = ({ registro }) => {
    const dispatch = useDispatch()
    const MySwal = swalContent(Swal)

    const [showModal, setShowModal] = useState(false)
    const [form, setForm] = useState({})
    const [formError, setFormError] = useState('')

    const handleOpenModal = () => {
        setForm({
            fechaRegistro: registro.fechaRegistro || '',
            producto: registro.producto || '',
            proveedor: registro.proveedor || '',
            factura: registro.factura || '',
            cantidad: registro.cantidad || 0,
            lote: registro.lote || '',
            registroInvima: registro.registroInvima || '',
            fechaVencimiento: registro.fechaVencimiento || '',
            descripcion: registro.descripcion || ''
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
        if (!form.fechaRegistro || !form.producto || !form.proveedor || !form.factura || !form.cantidad || !form.lote || !form.registroInvima || !form.fechaVencimiento || !form.descripcion) {
            setFormError('Todos los campos son obligatorios.')
            return
        }
        dispatch(updateRegistro(registro.id, form))
        setShowModal(false)
        MySwal.fire({
            title: '¡Actualizado!',
            text: 'Registro actualizado con éxito',
            icon: 'success',
            timer: 2000
        })
    }

    return (
        <>
            <div className="section-header px-4 tw-rounded-none tw-shadow-md tw-shadow-gray-200 lg:tw-rounded-lg">
                <h1 className="mb-1 tw-text-lg">Detalle Registro</h1>
            </div>

            <div className="section-body">
                <div className="card">
                    <div className="card-body px-0">
                        <h3>{registro.producto}</h3>
                        <p>Proveedor: {registro.proveedor}</p>
                        <p>Factura: {registro.factura}</p>
                        <p>Cantidad: {registro.cantidad}</p>
                        <p>Lote: {registro.lote}</p>
                        <p>Registro Invima: {registro.registroInvima}</p>
                        <p>Fecha Vencimiento: {registro.fechaVencimiento}</p>
                        <p className="px-4">
                            Descripcion: {registro.descripcion}
                        </p>
                        <button className="btn btn-warning mt-3" onClick={handleOpenModal}>
                            <i className="fas fa-edit"></i> Editar Registro
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Registro</h5>
                                <button type="button" className="close" onClick={handleCloseModal} aria-label="Cerrar">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="modal-body">
                                    {formError && <div className="alert alert-danger">{formError}</div>}
                                    <div className="form-group">
                                        <label>Fecha Registro</label>
                                        <input type="date" className="form-control" name="fechaRegistro" value={form.fechaRegistro} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Producto</label>
                                        <input type="text" className="form-control" name="producto" value={form.producto} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Proveedor</label>
                                        <input type="text" className="form-control" name="proveedor" value={form.proveedor} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Factura</label>
                                        <input type="text" className="form-control" name="factura" value={form.factura} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Cantidad</label>
                                        <input type="number" className="form-control" name="cantidad" value={form.cantidad} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Lote</label>
                                        <input type="text" className="form-control" name="lote" value={form.lote} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Registro Invima</label>
                                        <input type="text" className="form-control" name="registroInvima" value={form.registroInvima} onChange={handleChange} />
                                    </div>
                                    <div className="form-group">
                                        <label>Fecha Vencimiento</label>
                                        <input type="date" className="form-control" name="fechaVencimiento" value={form.fechaVencimiento} onChange={handleChange} />
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

export default Registro