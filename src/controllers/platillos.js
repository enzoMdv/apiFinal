const { getConnection } = require('../database/database');

const getPlatillos = async (req, res) => {
    try {
        const connection = await getConnection();
        const platillos = await connection.query('SELECT * FROM platillo WHERE estado = "Activo"');
        
        res.status(200).json(platillos);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getPlatilloById = async (req, res) => {
    try {
        const { id_platillo } = req.params;
        const connection = await getConnection();

        const platillo = await connection.query('SELECT * FROM platillo WHERE id_platillo = ? AND estado = "Activo"', [id_platillo]);

        if (platillo.length === 0) {
            return res.status(404).json({ message: 'Platillo no encontrado.' });
        }

        res.status(200).json(platillo[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const addPlatillo = async (req, res) => {
    try {
        const { nombre, ingredientes, precio, id_categoria } = req.body;
        if (!nombre || !ingredientes || !precio || !id_categoria) {
            return res.status(400).json({ message: 'Todos los campos (nombre, ingredientes, precio, id_categoria) son requeridos.' });
        }

        const connection = await getConnection();

        const [categoria] = await connection.query('SELECT * FROM categoria WHERE id_categoria = ?', [id_categoria]);
        if (categoria.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada.' });
        }

        await connection.query(
            'INSERT INTO platillo (nombre, ingredientes, precio, estado, id_categoria) VALUES (?, ?, ?, ?, ?)', 
            [nombre, ingredientes, precio, 'Activo', id_categoria]
        );

        res.status(201).json({ message: 'Platillo agregado correctamente.' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updatePlatillo = async (req, res) => {
    try {
        const { id_platillo, nombre, ingredientes, precio, id_categoria } = req.body;

        if (!id_platillo) {
            return res.status(400).json({ message: 'El ID del platillo es obligatorio' });
        }

        const connection = await getConnection();

        const [platillo] = await connection.query('SELECT * FROM platillo WHERE id_platillo = ?', [id_platillo]);
        if (platillo.length === 0) {
            return res.status(404).json({ message: 'Platillo no encontrado.' });
        }

        await connection.query(
            'UPDATE platillo SET nombre = ?, ingredientes = ?, precio = ?, id_categoria = ? WHERE id_platillo = ?',
            [nombre, ingredientes, precio, id_categoria, id_platillo]
        );

        res.status(200).json({ message: 'Platillo actualizado correctamente.' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deletePlatillo = async (req, res) => {
    try {
        const { id_platillo } = req.params;
        const connection = await getConnection();

        const platillo = await connection.query('SELECT * FROM platillo WHERE id_platillo = ?', [id_platillo]);
        if (platillo.length === 0) {
            return res.status(404).json({ message: 'Platillo no encontrado.' });
        }

        if (platillo[0].estado === 'Inactivo') {
            return res.status(400).json({ message: 'Este platillo ya está descontinuado o no disponible.' });
        }

        await connection.query('UPDATE platillo SET estado = "Inactivo" WHERE id_platillo = ?', [id_platillo]);

        res.status(200).json({ message: 'Platillo descontinuado correctamente.' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getPlatillos,
    getPlatilloById,
    addPlatillo,
    updatePlatillo,
    deletePlatillo
};
