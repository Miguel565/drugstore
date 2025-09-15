import { createSlice } from "@reduxjs/toolkit"
import productoService from "../services/productos"

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
        const proveedores = await productoService.getAll()
        dispatch(setProductos(proveedores))
    }
}

export const createProducto = (producto) => {
    return async dispatch => {
        const newProducto = await productoService.create(producto)
        dispatch(appendProducto(newProducto))
    }
}

export const modifyProducto = (id, producto) => {
    return async dispatch => {
        const updatedProducto = await productoService.update(id, producto)
        dispatch(updateProducto(updatedProducto))
    }
}

export const deleteProducto = (id) => {
    return async dispatch => {
        await productoService.remove(id)
        const proveedores = await productoService.getAll()
        dispatch(setProductos(proveedores))
    }
}

export const { setProductos, appendProducto, updateProducto } = productoSlice.actions

export default productoSlice.reducer