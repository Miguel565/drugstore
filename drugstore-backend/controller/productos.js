const productosRouter = require('express').Router()
const producto = require('../models/producto')
const pool = require('../utils/db')

productosRouter.get('/', async (req, res) => {
  const result = await pool.query(`
    SELECT p.*, pr.razon_social, pr.nombre_contacto
    FROM productos p
    JOIN proveedores pr ON p.proveedor_id = pr.id
  `);
  res.json(result.rows);
});

productosRouter.get('/:id', async (req, res) => {
  const producto = await productoModel.getProductoById(req.params.id);
    if (producto) {
        res.json(producto);
    } else {
        res.status(404).end();
    }
});

productosRouter.post('/', async (req, res) => {
  const nuevoProducto = await productoModel.createProducto(req.body);
  res.status(201).json(nuevoProducto);
});

productosRouter.put('/:id', async (req, res) => {
  const updatedProducto = await productoModel.updateProducto(req.params.id, req.body);
    if (updatedProducto) {
        res.json(updatedProducto);
    } else {
        res.status(404).end();
    }
});

productosRouter.delete('/:id', async (req, res) => {
  await productoModel.deleteProducto(req.params.id);
    res.status(204).end();
});

module.exports = productosRouter;