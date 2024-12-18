const express = require('express');
const meseroController = require('../controllers/meseros');

const router = express.Router();

// Devuelve todo
router.get('/api/mesero/getMeseros', meseroController.getMeseros);

// Busqueda por id
router.get('/api/mesero/:id_mesero', meseroController.getMeseroById);

// Crear un mesero
router.post('/api/agregarMesero', meseroController.addMesero);

// Actualizar datos de un mesero
router.put('/api/mesero', meseroController.updateMesero);

// Eliminar mesero (eliminación lógica) pasando la ID en la URL
router.delete('/api/mesero/:id_mesero', meseroController.delMesero);

// Login para mesero
router.post('/api/mesero/login', meseroController.loginMesero);

module.exports = router;


