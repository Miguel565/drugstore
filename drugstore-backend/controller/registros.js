const registrosRouter = require('express').Router()
const registro = require('../models/registro')

registrosRouter.get('/', async (req, res) => {
  const registros = await registro.getAllRecepciones();
  res.json(registros);
});

registrosRouter.get('/:id', async (req, res) => {
  const registro = await registro.getRecepcionById(req.params.id);
    if (registro) {
        res.json(registro);
    } else {
        res.status(404).end();
    }
});

registrosRouter.post('/', async (req, res) => {
  const nuevoRegistro = await registro.createRecepcion(req.body);
  res.status(201).json(nuevoRegistro);
});

registrosRouter.put('/:id', async (req, res) => {
    const updatedRegistro = await registro.updateRecepcion(req.params.id, req.body);
    if (updatedRegistro) {
        res.json(updatedRegistro);
    } else {
        res.status(404).end();
    }
});

registrosRouter.delete('/:id', async (req, res) => {
  await registro.deleteRecepcion(req.params.id);
    res.status(204).end();
});

module.exports = registrosRouter;