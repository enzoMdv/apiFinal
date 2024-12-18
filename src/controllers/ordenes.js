const { getConnection } = require('../database/database');

// Obtener todos los ordenes
const getOrdenes = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM orden');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener una orden por ID
const getOrdenById = async (req, res) => {
    try {
        const { id_mesa } = req.params; // Obtener ID desde la URL

        const connection = await getConnection();
        const orden = await connection.query('SELECT * FROM orden WHERE id_mesa = ?', [id_mesa]);

        // Devolver el mesero encontrado
        res.status(200).json(orden[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Obtener una orden por ID
const getOrdenByIdd = async (req, res) => {
    try {
        const { id_orden } = req.params; // Obtener ID desde la URL

        const connection = await getConnection();
        const orden = await connection.query('SELECT * FROM orden WHERE id_orden = ?', [id_orden]);

        // Devolver el mesero encontrado
        res.status(200).json(orden[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Crear una nueva orden
const addOrden = async (req, res) => {
    try {
        const { id_mesa, id_platillo, id_cliente, cantidad } = req.body;

        const connection = await getConnection();
        await connection.query(
            "INSERT INTO orden (id_mesa, id_platillo, id_cliente, cantidad) VALUES (?, ?, ?, ?)",
            [id_mesa, id_platillo, id_cliente, cantidad]
        );

        res.status(201).json({ message: "Orden agregada correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Actualizar datos de una orden
const updateOrden = async (req, res) => {
    try {
        const { id_orden, id_mesa, id_platillo, id_cliente, cantidad } = req.body;

        const connection = await getConnection();
        await connection.query(
            `UPDATE orden SET id_mesa = ?, id_platillo = ?, id_cliente = ?, cantidad = ?
             WHERE id_orden = ?`,
            [id_mesa, id_platillo, id_cliente, cantidad, id_orden ]
        );

        res.status(200).json({ message: 'Orden actualizada correctamente' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Eliminar una orden
const delOrden = async (req, res) => {
    try {
        const { id_orden } = req.params;
        const connection = await getConnection();
        await connection.query("DELETE FROM orden WHERE id_orden = ?", id_orden);
        res.status(200).json({ message: "Eliminación de orden correcta" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getOrdenByIdd,
    getOrdenes,
    getOrdenById,
    addOrden,
    updateOrden,
    delOrden
};