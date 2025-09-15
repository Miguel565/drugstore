import { configureStore } from '@reduxjs/toolkit'
import proveedorReducer from './reducers/proveedorReducer'
import productoReducer from './reducers/productoReducer'
import registroReducer from './reducers/registroReducer'


const store = configureStore({
	reducer: {
        proveedores: proveedorReducer,
		productos: productoReducer,
		regitros: registroReducer
	}
})

export default store