const express = require('express');
const clienteController = require('../controllers/clientes');

const router = express.Router();

// Obtener todos los clientes
router.get('/api/clientes', clienteController.getClientes); 

// Obtener un cliente por ID
router.get('/api/cliente/:id_cliente', clienteController.getClienteById);

// Agregar un nuevo cliente
router.post('/api/cliente', clienteController.addCliente);

// Actualizar un cliente 
router.put('/api/cliente', clienteController.updateCliente);

// Eliminar un cliente
router.delete('/api/cliente/:id_cliente', clienteController.delCliente);



module.exports = router;