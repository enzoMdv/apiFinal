const jwt = require('jsonwebtoken');
const config = require('../config/global');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(401).json({ auth: false, message: 'No se proporcionó un token' });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ auth: false, message: 'Token inválido' });
    }
}

module.exports = verifyToken;
