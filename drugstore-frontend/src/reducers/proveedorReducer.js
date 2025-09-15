import { createSlice } from "@reduxjs/toolkit";
import proveedorService from "../services/proveedores";

const proveedorSlice = createSlice({
    name: 'proveedores',
    initialState: [],
    reducers: {
        setProveedores(state, action) {
            return action.payload
        },
        appendProveedor(state, action) {
            state.push(action.payload)
        },
        updateProveedor(state, action) {
            const id = action.payload.id
            return state.map(proveedor => proveedor.id !== id ? proveedor : action.payload)
        }
    }
})

export const initializeProveedores = () => {
    return async dispatch => {
        const proveedores = await proveedorService.getAll()
        dispatch(setProveedores(proveedores))
    }
}

export const createProveedor = (proveedor) => {
    return async dispatch => {
        const newProveedor = await proveedorService.create(proveedor)
        dispatch(appendProveedor(newProveedor))
    }
}

export const modifyProveedor = (id, proveedor) => {
    return async dispatch => {
        const updatedProveedor = await proveedorService.update(id, proveedor)
        dispatch(updateProveedor(updatedProveedor))
    }
}

export const deleteProveedor = (id) => {
    return async dispatch => {
        await proveedorService.remove(id)
        const proveedores = await proveedorService.getAll()
        dispatch(setProveedores(proveedores))
    }
}

export const { setProveedores, appendProveedor, updateProveedor } = proveedorSlice.actions

export default proveedorSlice.reducer