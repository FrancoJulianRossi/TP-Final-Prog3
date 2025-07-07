const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categorias.controller');

router.get('/', categoriasController.getAll);
router.post('/', categoriasController.create);
router.delete('/:id', categoriasController.delete);

module.exports = router;