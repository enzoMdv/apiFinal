const express = require('express');
const categoriaController = require('../controllers/categorias');

const router = express.Router();

// Agregar una nueva categoría
router.post('/api/agregarCategoria', categoriaController.addCategoria);

// Busqueda por id
router.get('/api/categoria/:id_categoria', categoriaController.getCategoriaById);

// Actualizar datos de una categoría
router.put('/api/categoria', categoriaController.updateCategoria);

// Eliminar una categoría (eliminación lógica con validación de FK)
router.delete('/api/categoria/:id_categoria', categoriaController.deleteCategoria);

// Obtener todas las categorías
router.get('/api/categoria', categoriaController.getCategorias);

module.exports = router;
