const { getConnection } = require('../database/database');

// Obtener todos los clientes
const getClientes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM cliente');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener un cliente por ID
const getClienteById = async (req, res) => {
    try {
        const { id_cliente } = req.params; // Obtener ID desde la URL

        const connection = await getConnection();
        const cliente = await connection.query('SELECT * FROM cliente WHERE id_cliente = ?', [id_cliente]);

        // Devolver el mesero encontrado
        res.status(200).json(cliente[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Crear un nuevo cliente
const addCliente = async (req, res) => {
    try {
        const { nombre, apellidoPaterno, apellidoMaterno, correo, telefono, dni } = req.body;

        const connection = await getConnection();
        await connection.query(
            "INSERT INTO cliente (nombre, apellidoPaterno, apellidoMaterno, correo, telefono, dni) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellidoPaterno, apellidoMaterno, correo, telefono, dni]
        );

        res.status(201).json({ message: "Cliente agregado correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar datos de un cliente
const updateCliente = async (req, res) => {
    try {
        const { id_cliente, nombre, apellidoPaterno, apellidoMaterno, correo, telefono, dni } = req.body;

        const connection = await getConnection();
        await connection.query(
            `UPDATE cliente SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, correo = ?, telefono = ?, dni = ?
             WHERE id_cliente = ?`,
            [nombre, apellidoPaterno, apellidoMaterno, correo, telefono, dni, id_cliente]
        );

        res.status(200).json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Eliminar un cliente
const delCliente = async (req, res) => {
    try {
        const { id_cliente } = req.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM cliente WHERE id_cliente = ?", id_cliente);
        res.status(200).json({ message: "Eliminación de cliente correcta" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getClientes,
    getClienteById,
    addCliente,
    updateCliente,
    delCliente
};