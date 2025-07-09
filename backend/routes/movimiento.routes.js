const express = require('express');
const router = express.Router();
const movimientosController = require('../controllers/movimientos.controller');

router.get('/', movimientosController.getAll);
router.post('/', movimientosController.create);
router.put('/:id', movimientosController.update);

module.exports = router;