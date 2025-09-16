const proveedoresRouter = require('express').Router()
const proveedor = require('../models/proveedor')

proveedoresRouter.get('/', async (req, res) => {
  const proveedores = await proveedor.getAllProveedores();
  res.json(proveedores);
});

proveedoresRouter.get('/:id', async (req, res) => {
    const proveedorData = await proveedor.getProveedorById(req.params.id);
    if (proveedorData) {
        res.json(proveedorData);
    } else {
        res.status(404).end();
    }  
});

proveedoresRouter.post('/', async (req, res) => {
  const nuevoProveedor = await proveedor.createProveedor(req.body);
  res.status(201).json(nuevoProveedor);
});

proveedoresRouter.put('/:id', async (req, res) => {
    const updatedProveedor = await proveedor.updateProveedor(req.params.id, req.body);
    if (updatedProveedor) {
        res.json(updatedProveedor);
    } else {
        res.status(404).end();
    }
});

proveedoresRouter.delete('/:id', async (req, res) => {
  await proveedor.deleteProveedor(req.params.id);
    res.status(204).end();
});

module.exports = proveedoresRouter;