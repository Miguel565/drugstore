import { createSlice } from "@reduxjs/toolkit"
import proveedorService from "../services/producto"

const productoSlice = createSlice({
    name: 'productos',
    initialState: [],
    reducers: {
        setProductos(state, action) {
            return action.payload
        },
        appendProducto(state, action) {
            state.push(action.payload)
        },
        updateProducto(state, action) {
            const id = action.payload.id
            return state.map(producto => producto.id !== id ? producto : action.payload)
        }
    }
})

export const initializeProductos = () => {
    return async dispatch => {
        const proveedores = await proveedorService.getAll()
        dispatch(setProductos(proveedores))
    }
}

export const createProducto = (producto) => {
    return async dispatch => {
        const newProducto = await proveedorService.create(producto)
        dispatch(appendProducto(newProducto))
    }
}

export const modifyProducto = (id, producto) => {
    return async dispatch => {
        const updatedProducto = await proveedorService.update(id, producto)
        dispatch(updateProducto(updatedProducto))
    }
}

export const deleteProducto = (id) => {
    return async dispatch => {
        await proveedorService.remove(id)
        const proveedores = await proveedorService.getAll()
        dispatch(setProductos(proveedores))
    }
}

export const { setProductos, appendProducto, updateProducto } = productoSlice.actions

export default productoSlice.reducer