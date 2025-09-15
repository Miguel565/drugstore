import { createSlice } from '@reduxjs/toolkit'
import registroService from '../services/registros'

const registroSlice = createSlice({
    name: 'registros',
    initialState: [],
    reducers: {
        setRegistros(state, action) {
            return action.payload
        },

        appendRegistro(state, action) {
            state.push(action.payload)
        },

        updateRegistro(state, action ) {
            const id = action.payload.id
            return state.map(registro => registro.id !== id ? registro : action.payload)
        }
    }
})

export const initializeProductos = () => {
    return async dispatch => {
        const registros = await registroService.getAll()
        dispatch(setRegistros(registros))
    }
}

export const createRegistro = (registro) =>{
    return async dispatch => {
        const newRegistro = await registroService.create(registro)
        dispatch(appendRegistro(newRegistro))
    }
}

export const modifyRegistro = (id, registro) => {
    return async dispatch => {
        const updatedRegistro = await registroService.update(id, registro)
        dispatch(updateRegistro(updatedRegistro))
    }
}

export const deleteRegistro = (id) => {
    return async dispatch => {
        await registroService.remove(id)
        const registros = await registroService.getAll()
        dispatch(setRegistros(registros))
    }
}

export const { setRegistros, appendRegistro, updateRegistro} = registroSlice.actions

export default registroSlice.reducer