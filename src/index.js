const app = require('./app');

const main = () => {
    try {
        app.listen(app.get('port'), () => {
            console.log(`Server corriendo en el puerto: ${app.get('port')} http://localhost:3030`);
        });
    } catch (error) {
        console.error('Error al iniciar el servidor:', error);
    }
};

main();
