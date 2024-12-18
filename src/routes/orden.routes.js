const express = require('express');
const ordenController = require('../controllers/ordenes');

const router = express.Router();

// Obtener todos los clientes
router.get('/api/ordenes', ordenController.getOrdenes); 

//ojbeto por mesa
router.get('/api/orden/:id_mesa', ordenController.getOrdenById);

//objeto por mesa
router.get('/api/orden/:id_orden', ordenController.getOrdenByIdd);

// Agregar un nuevo cliente
router.post('/api/orden', ordenController.addOrden);

// Actualizar un cliente 
router.put('/api/orden', ordenController.updateOrden);

// Eliminar un cliente
router.delete('/api/orden/:id_orden', ordenController.delOrden);



module.exports = router;