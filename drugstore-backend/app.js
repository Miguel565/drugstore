const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')



const productosRouter = require('./controllers/productos')
const proveedoresRouter = require('./controllers/proveedores')
const registrosRouter = require('./controllers/registros')

module.exports = app