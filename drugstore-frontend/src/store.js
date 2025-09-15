import { configureStore } from '@reduxjs/toolkit'
import proveedorReducer from './reducers/proveedorReducer'


const store = configureStore({
	reducer: {
        proveedores: proveedorReducer
	}
})

export default store