import { configureStore } from '@reduxjs/toolkit'
import proveedorReducer from './reducers/proveedorReducer'
import productoReducer from './reducers/productoReducer'


const store = configureStore({
	reducer: {
        proveedores: proveedorReducer,
		productos: productoReducer
	}
})

export default store