const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const productosRouter = require('./controllers/productos')
const proveedoresRouter = require('./controllers/proveedores')
const registrosRouter = require('./controllers/registros')

app.use(cors())
app.use(express.json())

app.use('/api/productos', productosRouter)
app.use('/api/proveedores', proveedoresRouter)
app.use('/api/registros', registrosRouter)

module.exports = app