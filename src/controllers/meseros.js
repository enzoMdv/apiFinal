const { getConnection } = require('../database/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/global'); 

const addMesero = async (req, res) => {
    try {
        const { nombre, apellidoPaterno, apellidoMaterno, dni, contraseha } = req.body;

        const salt = await bcrypt.genSalt(10);
        const contrasehaEncriptada = await bcrypt.hash(contraseha, salt); 

        const connection = await getConnection();
        await connection.query(
            "INSERT INTO mesero (nombre, apellidoPaterno, apellidoMaterno, dni, contraseha, estado) VALUES (?, ?, ?, ?, ?, ?)",
            [nombre, apellidoPaterno, apellidoMaterno, dni, contrasehaEncriptada, "Activo"]
        );

        res.status(201).json({ message: "Mesero agregado correctamente" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getMeseroById = async (req, res) => {
    try {
        const { id_mesero } = req.params;

        const connection = await getConnection();
        const mesero = await connection.query('SELECT id_mesero, nombre, apellidoPaterno, apellidoMaterno, dni FROM mesero WHERE id_mesero = ?', [id_mesero]);

        res.status(200).json(mesero[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getMeseros = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query(
            'SELECT id_mesero, nombre, apellidoPaterno, apellidoMaterno, dni FROM mesero WHERE estado = "Activo"'
        );
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getMesero = async (req, res) => {
    try {
        const { dni } = req.params;
        const connection = await getConnection();
        const [result] = await connection.query('SELECT * FROM mesero WHERE dni = ? AND estado = "Activo"', [dni]);

        if (!result) {
            return res.status(404).json({ message: 'Mesero no encontrado' });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateMesero = async (req, res) => {
    try {
        const { id_mesero, nombre, apellidoPaterno, apellidoMaterno, dni } = req.body;

        const connection = await getConnection();

        await connection.query(
            `UPDATE mesero 
             SET nombre = ?, apellidoPaterno = ?, apellidoMaterno = ?, dni = ?
             WHERE id_mesero = ?`,
            [nombre, apellidoPaterno, apellidoMaterno, dni, id_mesero]
        );

        res.status(200).json({ message: 'Mesero actualizado correctamente' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const delMesero = async (req, res) => {
    try {
        const { id_mesero } = req.params;
        const connection = await getConnection();
        await connection.query('UPDATE mesero SET estado = "Inactivo" WHERE id_mesero = ?', [id_mesero]);
        res.status(200).json({ message: 'Mesero eliminado correctamente' });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const loginMesero = async (req, res) => {
    try {
        const { dni, contraseha } = req.body;

        const connection = await getConnection();

        const [mesero] = await connection.query("SELECT * FROM mesero WHERE dni = ?", [dni]);

        if (!mesero) {
            return res.status(404).send('Ingreso al sistema invalido');
        }

        if (mesero.estado === "Inactivo") {
            return res.status(403).json({ auth: false, message: "El mesero está inactivo" });
        }

        const validPassword = await bcrypt.compare(contraseha, mesero.contraseha);

        if (!validPassword) {
            return res.status(401).json({ auth: false, token: null });
        }

        const token = jwt.sign({ id_mesero: mesero.id_mesero }, config.secret, {
            expiresIn: 60 * 60 * 24
        });

        res.json({ auth: true, token });

    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error');
    }
};



module.exports = {
    getMeseroById,
    addMesero,
    getMeseros,
    getMesero, 
    updateMesero,  
    delMesero,  
    loginMesero
};
