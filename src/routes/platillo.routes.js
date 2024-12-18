const express = require('express');
const platilloController = require('../controllers/platillos');

const router = express.Router();

// Obtener todos los platillos activos
router.get('/api/platillos', platilloController.getPlatillos); 

// Obtener un platillo por ID
router.get('/api/platillo/:id_platillo', platilloController.getPlatilloById);

// Agregar un nuevo platillo
router.post('/api/platillo', platilloController.addPlatillo);

// Actualizar un platillo existente
router.put('/api/platillo', platilloController.updatePlatillo);

// Eliminar (descontinuar) un platillo
router.delete('/api/platillo/:id_platillo', platilloController.deletePlatillo);



module.exports = router;
