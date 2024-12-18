const { getConnection } = require('../database/database');

const getCategorias = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query('SELECT * FROM categoria');
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getCategoriaById = async (req, res) => {
    try {
        const { id_categoria } = req.params; 

        const connection = await getConnection();
        const categoria = await connection.query('SELECT * FROM categoria WHERE id_categoria = ?', [id_categoria]);

        // Devolver el mesero encontrado
        res.status(200).json(categoria[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateCategoria = async (req, res) => {
    try {
        const { id_categoria, nombre, descripcion } = req.body;

        const connection = await getConnection();
        await connection.query(
            'UPDATE categoria SET nombre = ?, descripcion = ? WHERE id_categoria = ?',
            [nombre, descripcion, id_categoria]
        );

        res.status(200).json({ message: 'Categoría actualizada correctamente' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteCategoria = async (req, res) => {
    try {
        const { id_categoria } = req.params; 
        const connection = await getConnection();

        const [category] = await connection.query('SELECT * FROM categoria WHERE id_categoria = ?', [id_categoria]);
        if (category.length === 0) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        const [result] = await connection.query(
            'SELECT COUNT(*) AS total FROM platillo WHERE id_categoria = ?',
            [id_categoria]
        );

        if (result.total > 0) {
            return res.status(400).json({ message: 'Error al eliminar, categoría relacionada con un platillo' });
        }

        await connection.query('DELETE FROM categoria WHERE id_categoria = ?', [id_categoria]);

        res.status(200).json({ message: 'Categoría eliminada correctamente' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};


const addCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        const connection = await getConnection();
        await connection.query(
            'INSERT INTO categoria (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );

        res.status(201).json({ message: 'Categoría agregada correctamente' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getCategoriaById,
    getCategorias,
    updateCategoria,
    deleteCategoria,
    addCategoria
};
