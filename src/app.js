const express = require('express');
const morgan = require('morgan');
const meseroRoutes = require('./routes/mesero.routes'); 
const categoriaRoutes = require('./routes/categoria.routes');
const platilloaRoutes = require('./routes/platillo.routes'); 
const clienteRoutes = require('./routes/cliente.routes'); // Importar rutas de clientes
const ordenRoutes = require('./routes/orden.routes'); // Importar rutas de clientes
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.set('port', 3030);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(meseroRoutes); 

app.use(categoriaRoutes);

app.use(platilloaRoutes);

app.use(clienteRoutes);

app.use(ordenRoutes);

module.exports = app;
